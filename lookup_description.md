# 📋 Lookup Reference Tables

## 🔹 ClassID: High-Level Categories

| ClassID | Description                |
|---------|----------------------------|
| `OWS`   | Obesity / Weight Status    |
| `PA`    | Physical Activity          |
| `FV`    | Fruits & Vegetables        |

## 🔹 TopicID: Specific Topic Areas

| TopicID | Description                       |
|---------|-----------------------------------|
| `OWS1`  | Obesity / Weight Status           |
| `PA1`   | Physical Activity - Behavior      |
| `FV1`   | Fruits & Vegetables               |

## 🔹 QuestionID: Indicator Questions

| QuestionID | Description                                                                |
|------------|----------------------------------------------------------------------------|
| `Q018`     | Percent of adults who consume fruit 1 or more times per day               |
| `Q019`     | Percent of adults who consume vegetables 1 or more times per day          |
| `Q036`     | Percent of adults aged 18 years and older who have obesity                |
| `Q037`     | Percent of adults aged 18 years and older who are overweight              |
| `Q043`     | Percent of adults who engage in no leisure-time physical activity         |
| `Q044`     | Percent of adults meeting aerobic physical activity guidelines            |
| `Q045`     | Percent of adults meeting muscle-strengthening guidelines                 |
| `Q046`     | Percent of adults meeting both aerobic and muscle-strengthening guidelines|
| `Q047`     | Percent of adults who walk or bicycle for transportation                  |

## 🔹 LocationID: Geographic Lookup

| LocationID | Location             |
|------------|----------------------|
| 1          | Alabama              |
| 2          | Alaska               |
| 4          | Arizona              |
| 5          | Arkansas             |
| 6          | California           |
| 8          | Colorado             |
| 9          | Connecticut          |
| 10         | Delaware             |
| 11         | District of Columbia |
| 12         | Florida              |
| 13         | Georgia              |
| 15         | Hawaii               |
| 16         | Idaho                |
| 17         | Illinois             |
| 18         | Indiana              |
| 19         | Iowa                 |
| 20         | Kansas               |
| 21         | Kentucky             |
| 22         | Louisiana            |
| 23         | Maine                |
| 24         | Maryland             |
| 25         | Massachusetts        |
| 26         | Michigan             |
| 27         | Minnesota            |
| 28         | Mississippi          |
| 29         | Missouri             |
| 30         | Montana              |
| 31         | Nebraska             |
| 32         | Nevada               |
| 33         | New Hampshire        |
| 34         | New Jersey           |
| 35         | New Mexico           |
| 36         | New York             |
| 37         | North Carolina       |
| 38         | North Dakota         |
| 39         | Ohio                 |
| 40         | Oklahoma             |
| 41         | Oregon               |
| 42         | Pennsylvania         |
| 44         | Rhode Island         |
| 45         | South Carolina       |
| 46         | South Dakota         |
| 47         | Tennessee            |
| 48         | Texas                |
| 49         | Utah                 |
| 50         | Vermont              |
| 51         | Virginia             |
| 53         | Washington           |
| 54         | West Virginia        |
| 55         | Wisconsin            |
| 56         | Wyoming              |
| 59         | American Samoa       |
| 66         | Guam                 |
| 72         | Puerto Rico          |
| 78         | Virgin Islands       |

## 🔹 StratificationCategory1: Demographic Grouping Fields

| Category              |
|-----------------------|
| Race/Ethnicity        |
| Sex                   |
| Age (years)           |
| Income                |
| Education             |
| Total (Overall)       |

## 🔹 Stratification1: Demographic Values

| Value                               | Type         |
|-------------------------------------|--------------|
| 18 - 24                             | Age group    |
| 25 - 34                             | Age group    |
| 35 - 44                             | Age group    |
| 45 - 54                             | Age group    |
| 55 - 64                             | Age group    |
| 65 or older                         | Age group    |
| Male                                | Sex          |
| Female                              | Sex          |
| Less than high school               | Education    |
| High school graduate                | Education    |
| Some college or technical school    | Education    |
| College graduate                    | Education    |
| Less than $15,000                   | Income       |
| $15,000 - $24,999                   | Income       |
| $25,000 - $34,999                   | Income       |
| $35,000 - $49,999                   | Income       |
| $50,000 - $74,999                   | Income       |
| $75,000 or greater                  | Income       |
| Non-Hispanic White                  | Race/Ethnicity |
| Non-Hispanic Black                  | Race/Ethnicity |
| Hispanic                            | Race/Ethnicity |
| Asian                               | Race/Ethnicity |
| Hawaiian/Pacific Islander          | Race/Ethnicity |
| American Indian/Alaska Native      | Race/Ethnicity |
| 2 or more races                     | Race/Ethnicity |
| Other                               | Race/Ethnicity |
| Data not reported                   | Special       |
| Total                               | Overall       |

## 🔹 StratificationCategoryId1 & StratificationID1

| Category ID | Meaning             |
|-------------|---------------------|
| `RACE`      | Race/Ethnicity      |
| `SEX`       | Sex                 |
| `AGEYR`     | Age (years)         |
| `INC`       | Income              |
| `EDU`       | Education           |
| `OVR`       | Total / Overall     |

| StratificationID1 | Value Description                 |
|-------------------|-----------------------------------|
| `AGEYR1824`       | Age 18–24                         |
| `AGEYR2534`       | Age 25–34                         |
| `AGEYR3544`       | Age 35–44                         |
| `AGEYR4554`       | Age 45–54                         |
| `AGEYR5564`       | Age 55–64                         |
| `AGEYR65PLUS`     | Age 65 or older                   |
| `MALE`            | Male                              |
| `FEMALE`          | Female                            |
| `EDUHS`           | High school graduate              |
| `EDUCOTEC`        | Some college or technical school  |
| `EDUCOGRAD`       | College graduate                  |
| `EDUHSGRAD`       | High school graduate              |
| `RACEWHT`         | Non-Hispanic White                |
| `RACEBLK`         | Non-Hispanic Black                |
| `RACEHIS`         | Hispanic                          |
| `RACEASN`         | Asian                             |
| `RACEHPI`         | Hawaiian/Pacific Islander         |
| `RACENAA`         | American Indian/Alaska Native     |
| `RACE2PLUS`       | 2 or more races                   |
| `RACEOTH`         | Other                             |
| `INCLESS15`       | Less than $15,000                 |
| `INC1525`         | $15,000 - $24,999                 |
| `INC2535`         | $25,000 - $34,999                 |
| `INC3550`         | $35,000 - $49,999                 |
| `INC5075`         | $50,000 - $74,999                 |
| `INC75PLUS`       | $75,000 or greater                |
| `INCNR`           | Income not reported               |
| `OVERALL`         | Total (all groups)                |