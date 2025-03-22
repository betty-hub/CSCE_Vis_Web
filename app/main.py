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
    df = pd.read_csv('./app/data/raw1.csv')
    df.columns = df.columns.str.strip().str.replace(' ', '_').str.replace(r'[()/]', '', regex=True)

    filtered = df[
        (df['QuestionID'] == question_id) &
        (df['Stratification1'] == 'Total')
    ][['YearStart', 'LocationAbbr', 'LocationDesc', 'Data_Value']].dropna()

    filtered['Data_Value'] = pd.to_numeric(filtered['Data_Value'], errors='coerce')
    filtered = filtered.replace([np.inf, -np.inf], np.nan).dropna()

    fig = px.choropleth(
        filtered,
        locations='LocationAbbr',
        locationmode='USA-states',
        color='Data_Value',
        animation_frame='YearStart',
        color_continuous_scale='Reds',
        scope='usa'
    )

    fig.update_layout(
        title=None,
        margin=dict(t=0, b=20, l=0, r=0),
        height=600
    )

    return HTMLResponse(content=fig.to_html(full_html=False))