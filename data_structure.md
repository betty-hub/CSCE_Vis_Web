# 📋 Dataset Column Definitions

- https://chronicdata.cdc.gov/Nutrition-Physical-Activity-and-Obesity/Nutrition-Physical-Activity-and-Obesity-Behavioral/hn4x-zwk7/about_data

## 🔹 General (Temporal and Location)

| Column Name   | Description                                        | Data Type |
|---------------|----------------------------------------------------|-----------|
| YearStart     | Start year of data collection                      | Number    |
| YearEnd       | End year of data collection; same as YearStart for single-year data | Number    |
| LocationAbbr  | Location abbreviation                              | Text      |
| LocationDesc  | Full name or description of the location           | Text      |
| GeoLocation   | Geographic coordinates in format `(latitude, longitude)` | Location  |

## 🔹 Classification (Contextual Information)

| Column Name | Description                                        | Data Type |
|-------------|----------------------------------------------------|-----------|
| Datasource  | Origin or provider of the dataset                  | Text      |
| Class       | General classification of the data category        | Text      |
| Topic       | Specific subject or topic of the data collected    | Text      |
| Question    | Full descriptive text of the survey question or indicator | Text      |

## 🔹 Data Values (Reported Metrics)

| Column Name                 | Description                                              | Data Type |
|-----------------------------|----------------------------------------------------------|-----------|
| Data_Value_Unit             | Measurement unit, such as `%`                            | Text      |
| Data_Value_Type             | Nature of the data, e.g., Percentage or Number           | Text      |
| Data_Value                  | Main numeric data reported                               | Number    |
| Data_Value_Alt              | Alternative numeric form of the reported value           | Number    |
| Data_Value_Footnote_Symbol  | Symbol referencing additional footnotes                  | Text      |
| Data_Value_Footnote         | Explanation or detailed notes related to the data value  | Text      |

## 🔹 Confidence Interval & Sample Size

| Column Name            | Description                                      | Data Type |
|------------------------|--------------------------------------------------|-----------|
| Low_Confidence_Limit   | Lower bound of the 95% confidence interval       | Number    |
| High_Confidence_Limit  | Upper bound of the 95% confidence interval       | Number    |
| Sample_Size            | Total number of observations or data points collected | Number    |

## 🔹 Demographic Stratification

| Column Name     | Description                           | Data Type |
|-----------------|---------------------------------------|-----------|
| Total           | Represents aggregate or overall data category | Text      |
| Age(years)      | Age group categorization              | Text      |
| Education       | Education level categorization        | Text      |
| Sex             | Gender categorization                 | Text      |
| Income          | Income level categorization           | Text      |
| Race/Ethnicity  | Racial or ethnic group categorization | Text      |

## 🔹 Lookup & Identifier Columns

| Column Name               | Description                                                 | Data Type |
|---------------------------|-------------------------------------------------------------|-----------|
| ClassID                   | Unique identifier for class/category                        | Text      |
| TopicID                   | Unique identifier for topic category                        | Text      |
| QuestionID                | Unique identifier for the question or indicator             | Text      |
| DataValueTypeID           | Unique identifier for the type of data value                | Text      |
| LocationID                | Unique identifier for geographical location                 | Text      |
| StratificationCategory1   | Category used for stratification, such as "Age Group" or "Sex" | Text      |
| Stratification1           | Specific value within the stratification category, such as "Male" or "Female" | Text      |
| StratificationCategoryId1 | Unique identifier for the stratification value              | Text      |
| StratificationID1         | Unique identifier for the stratification category           | Text      |

