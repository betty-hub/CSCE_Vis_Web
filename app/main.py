from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi import Query

import pandas as pd
import numpy as np
import plotly.express as px

app = FastAPI()

# Static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="app/templates")

# Load and clean dataset once at startup
df = pd.read_csv("./app/data/raw1.csv")
df.columns = df.columns.str.strip().str.replace(" ", "_").str.replace(r"[()/]", "", regex=True)

# Available years and questions
available_years = sorted(df["YearStart"].dropna().unique().astype(int))
questions = (
    df[["QuestionID", "Question"]]
    .drop_duplicates()
    .sort_values("Question")
    .values.tolist()
)

# Available states
available_states = sorted(df["LocationAbbr"].dropna().unique().tolist())

@app.get("/", response_class=HTMLResponse)
def root(request: Request):
    return templates.TemplateResponse("index.html", {
        "request": request,
        "years": available_years,
        "questions": questions
    })


@app.get("/line_data")
def line_data(year: int, question_id: str):
    df = pd.read_csv('./app/data/raw1.csv')
    df.columns = df.columns.str.strip().str.replace(' ', '_').str.replace(r'[()/]', '', regex=True)

    filtered = df[(df['YearStart'] == year) & (df['QuestionID'] == question_id)]

    stratified = filtered[filtered['Stratification1'] != 'Total']
    stratified['Data_Value'] = pd.to_numeric(stratified['Data_Value'], errors='coerce')
    stratified = stratified.replace([np.inf, -np.inf], np.nan).dropna(subset=['Data_Value'])

    grouped = stratified.groupby('StratificationCategory1')

    result = {}
    for category, group in grouped:
        result[category] = group[['Stratification1', 'Data_Value']].to_dict(orient='records')

    return JSONResponse(content={"data": result})


@app.get("/api/map-data")
def get_map_data(question_id: str):
    filtered = df[
        (df["QuestionID"] == question_id) &
        (df["Stratification1"] == "Total") &
        (df["Data_Value"].notnull())
    ][["YearStart", "LocationAbbr", "LocationDesc", "Data_Value"]]

    result = filtered.to_dict(orient="records")
    return JSONResponse(content=result)


@app.get("/api/animated_data")
def get_animated_data(question_id: str = Query(...)):
    try:
        df = pd.read_csv('./app/data/raw1.csv')
        df.columns = df.columns.str.strip().str.replace(' ', '_').str.replace(r'[()/]', '', regex=True)

        filtered = df[
            (df['QuestionID'] == question_id) &
            (df['Stratification1'] == 'Total')
        ][['YearStart', 'LocationAbbr', 'LocationDesc', 'Data_Value']].dropna()

        filtered['Data_Value'] = pd.to_numeric(filtered['Data_Value'], errors='coerce')
        filtered = filtered.replace([np.inf, -np.inf], np.nan).dropna()

        result = filtered.to_dict(orient="records")
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


# Ensure the /api/pie_data endpoint always returns valid JSON
@app.get("/api/pie_data")
def get_pie_data(year: int, question_id: str, state: str, category: str):
    try:
        df = pd.read_csv('./app/data/raw1.csv')
        df.columns = df.columns.str.strip().str.replace(' ', '_').str.replace(r'[()/]', '', regex=True)

        filtered = df[
            (df['YearStart'] == year) & 
            (df['QuestionID'] == question_id) & 
            (df['LocationAbbr'] == state)
        ]
        stratified = filtered[filtered['Stratification1'] != 'Total']
        stratified['Data_Value'] = pd.to_numeric(stratified['Data_Value'], errors='coerce')
        stratified = stratified.replace([np.inf, -np.inf], np.nan).dropna(subset=['Data_Value'])

        if category == 'Income':
            valid_category = stratified['Income'].notnull() & ~stratified['Income'].str.contains("Data not reported", na=False)
            stratified = stratified[valid_category]
            pie_data = stratified.groupby('Income')['Data_Value'].sum().reset_index()
        elif category == 'Sex':
            # Ensure the 'Sex' column exists and is used correctly
            if 'Sex' in stratified.columns:
                valid_category = stratified['Sex'].notnull()
                stratified = stratified[valid_category]
                pie_data = stratified.groupby('Sex')['Data_Value'].sum().reset_index()
            else:
                return JSONResponse(content={"error": "Sex column not found"}, status_code=400)
        elif category == 'Education':
            valid_category = stratified['Education'].notnull() & ~stratified['Education'].str.contains("Data not reported", na=False)
            stratified = stratified[valid_category]
            pie_data = stratified.groupby('Education')['Data_Value'].sum().reset_index()
        else:
            return JSONResponse(content={"error": "Invalid category"}, status_code=400)

        pie_data = pie_data.to_dict(orient='records')
        return JSONResponse(content={"data": pie_data})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.get("/pie_chart", response_class=HTMLResponse)
def pie_chart(request: Request):
    return templates.TemplateResponse("pie_chart.html", {
        "request": request,
        "years": available_years,
        "questions": questions,
        "states": available_states
    })