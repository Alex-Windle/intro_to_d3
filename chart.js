function makeChart (chartConfigObject) {
    console.log("config object: ", chartConfigObject);
              var lookUpObject = {
                "DataSource": {
                    "BRFSS": {
                        "id": "BRFSS",
                        "name": "BRFSS - Behavioral Risk Factors Surveillance System",
                        "sort": 1
                    }
                },
                "DataValueType": {
                    "AGEADJPREV": {
                        "id": "AGEADJPREV",
                        "name": "Age-adjusted Prevalence",
                        "sort": 1
                    },
                    "PREV": {
                        "id": "PREV",
                        "name": "Prevalence",
                        "sort": 2
                    }
                },
                "Location": {
                    "10": {
                        "id": "10",
                        "name": "Delaware",
                        "abbr": "DE",
                        "sort": 9
                    },
                    "11": {
                        "id": "11",
                        "name": "District of Columbia",
                        "abbr": "DC",
                        "sort": 10
                    },
                    "12": {
                        "id": "12",
                        "name": "Florida",
                        "abbr": "FL",
                        "sort": 11
                    },
                    "13": {
                        "id": "13",
                        "name": "Georgia",
                        "abbr": "GA",
                        "sort": 12
                    },
                    "15": {
                        "id": "15",
                        "name": "Hawaii",
                        "abbr": "HI",
                        "sort": 13
                    },
                    "16": {
                        "id": "16",
                        "name": "Idaho",
                        "abbr": "ID",
                        "sort": 14
                    },
                    "17": {
                        "id": "17",
                        "name": "Illinois",
                        "abbr": "IL",
                        "sort": 15
                    },
                    "18": {
                        "id": "18",
                        "name": "Indiana",
                        "abbr": "IN",
                        "sort": 16
                    },
                    "19": {
                        "id": "19",
                        "name": "Iowa",
                        "abbr": "IA",
                        "sort": 17
                    },
                    "20": {
                        "id": "20",
                        "name": "Kansas",
                        "abbr": "KS",
                        "sort": 18
                    },
                    "21": {
                        "id": "21",
                        "name": "Kentucky",
                        "abbr": "KY",
                        "sort": 19
                    },
                    "22": {
                        "id": "22",
                        "name": "Louisiana",
                        "abbr": "LA",
                        "sort": 20
                    },
                    "23": {
                        "id": "23",
                        "name": "Maine",
                        "abbr": "ME",
                        "sort": 21
                    },
                    "24": {
                        "id": "24",
                        "name": "Maryland",
                        "abbr": "MD",
                        "sort": 22
                    },
                    "25": {
                        "id": "25",
                        "name": "Massachusetts",
                        "abbr": "MA",
                        "sort": 23
                    },
                    "26": {
                        "id": "26",
                        "name": "Michigan",
                        "abbr": "MI",
                        "sort": 24
                    },
                    "27": {
                        "id": "27",
                        "name": "Minnesota",
                        "abbr": "MN",
                        "sort": 25
                    },
                    "28": {
                        "id": "28",
                        "name": "Mississippi",
                        "abbr": "MS",
                        "sort": 26
                    },
                    "29": {
                        "id": "29",
                        "name": "Missouri",
                        "abbr": "MO",
                        "sort": 27
                    },
                    "30": {
                        "id": "30",
                        "name": "Montana",
                        "abbr": "MT",
                        "sort": 28
                    },
                    "31": {
                        "id": "31",
                        "name": "Nebraska",
                        "abbr": "NE",
                        "sort": 29
                    },
                    "32": {
                        "id": "32",
                        "name": "Nevada",
                        "abbr": "NV",
                        "sort": 30
                    },
                    "33": {
                        "id": "33",
                        "name": "New Hampshire",
                        "abbr": "NH",
                        "sort": 31
                    },
                    "34": {
                        "id": "34",
                        "name": "New Jersey",
                        "abbr": "NJ",
                        "sort": 32
                    },
                    "35": {
                        "id": "35",
                        "name": "New Mexico",
                        "abbr": "NM",
                        "sort": 33
                    },
                    "36": {
                        "id": "36",
                        "name": "New York",
                        "abbr": "NY",
                        "sort": 34
                    },
                    "37": {
                        "id": "37",
                        "name": "North Carolina",
                        "abbr": "NC",
                        "sort": 35
                    },
                    "38": {
                        "id": "38",
                        "name": "North Dakota",
                        "abbr": "ND",
                        "sort": 36
                    },
                    "39": {
                        "id": "39",
                        "name": "Ohio",
                        "abbr": "OH",
                        "sort": 37
                    },
                    "40": {
                        "id": "40",
                        "name": "Oklahoma",
                        "abbr": "OK",
                        "sort": 38
                    },
                    "41": {
                        "id": "41",
                        "name": "Oregon",
                        "abbr": "OR",
                        "sort": 39
                    },
                    "42": {
                        "id": "42",
                        "name": "Pennsylvania",
                        "abbr": "PA",
                        "sort": 40
                    },
                    "44": {
                        "id": "44",
                        "name": "Rhode Island",
                        "abbr": "RI",
                        "sort": 41
                    },
                    "45": {
                        "id": "45",
                        "name": "South Carolina",
                        "abbr": "SC",
                        "sort": 42
                    },
                    "46": {
                        "id": "46",
                        "name": "South Dakota",
                        "abbr": "SD",
                        "sort": 43
                    },
                    "47": {
                        "id": "47",
                        "name": "Tennessee",
                        "abbr": "TN",
                        "sort": 44
                    },
                    "48": {
                        "id": "48",
                        "name": "Texas",
                        "abbr": "TX",
                        "sort": 45
                    },
                    "49": {
                        "id": "49",
                        "name": "Utah",
                        "abbr": "UT",
                        "sort": 46
                    },
                    "50": {
                        "id": "50",
                        "name": "Vermont",
                        "abbr": "VT",
                        "sort": 47
                    },
                    "51": {
                        "id": "51",
                        "name": "Virginia",
                        "abbr": "VA",
                        "sort": 48
                    },
                    "53": {
                        "id": "53",
                        "name": "Washington",
                        "abbr": "WA",
                        "sort": 49
                    },
                    "54": {
                        "id": "54",
                        "name": "West Virginia",
                        "abbr": "WV",
                        "sort": 50
                    },
                    "55": {
                        "id": "55",
                        "name": "Wisconsin",
                        "abbr": "WI",
                        "sort": 51
                    },
                    "56": {
                        "id": "56",
                        "name": "Wyoming",
                        "abbr": "WY",
                        "sort": 52
                    },
                    "66": {
                        "id": "66",
                        "name": "Guam",
                        "abbr": "GU",
                        "sort": 53
                    },
                    "72": {
                        "id": "72",
                        "name": "Puerto Rico",
                        "abbr": "PR",
                        "sort": 54
                    },
                    "78": {
                        "id": "78",
                        "name": "U.S. Virgin Islands",
                        "abbr": "VI",
                        "sort": 55
                    },
                    "80": {
                        "id": "80",
                        "name": "HHS Region 1",
                        "abbr": "HHS1",
                        "sort": 56
                    },
                    "81": {
                        "id": "81",
                        "name": "HHS Region 2",
                        "abbr": "HHS2",
                        "sort": 57
                    },
                    "82": {
                        "id": "82",
                        "name": "HHS Region 3",
                        "abbr": "HHS3",
                        "sort": 58
                    },
                    "83": {
                        "id": "83",
                        "name": "HHS Region 4",
                        "abbr": "HHS4",
                        "sort": 59
                    },
                    "84": {
                        "id": "84",
                        "name": "HHS Region 5",
                        "abbr": "HHS5",
                        "sort": 60
                    },
                    "85": {
                        "id": "85",
                        "name": "HHS Region 6",
                        "abbr": "HHS6",
                        "sort": 61
                    },
                    "86": {
                        "id": "86",
                        "name": "HHS Region 7",
                        "abbr": "HHS7",
                        "sort": 62
                    },
                    "87": {
                        "id": "87",
                        "name": "HHS Region 8",
                        "abbr": "HHS8",
                        "sort": 63
                    },
                    "88": {
                        "id": "88",
                        "name": "HHS Region 9",
                        "abbr": "HHS9",
                        "sort": 64
                    },
                    "89": {
                        "id": "89",
                        "name": "HHS Region 10",
                        "abbr": "HHS10",
                        "sort": 65
                    },
                    "00": {
                        "id": "00",
                        "name": "United States, DC & Territories",
                        "abbr": "US",
                        "sort": 1
                    },
                    "01": {
                        "id": "01",
                        "name": "Alabama",
                        "abbr": "AL",
                        "sort": 2
                    },
                    "02": {
                        "id": "02",
                        "name": "Alaska",
                        "abbr": "AK",
                        "sort": 3
                    },
                    "04": {
                        "id": "04",
                        "name": "Arizona",
                        "abbr": "AZ",
                        "sort": 4
                    },
                    "05": {
                        "id": "05",
                        "name": "Arkansas",
                        "abbr": "AR",
                        "sort": 5
                    },
                    "06": {
                        "id": "06",
                        "name": "California",
                        "abbr": "CA",
                        "sort": 6
                    },
                    "08": {
                        "id": "08",
                        "name": "Colorado",
                        "abbr": "CO",
                        "sort": 7
                    },
                    "09": {
                        "id": "09",
                        "name": "Connecticut",
                        "abbr": "CT",
                        "sort": 8
                    }
                },
                "Question": {
                    "STATTYPE": {
                        "id": "STATTYPE",
                        "name": "Disability status and types among adults 18 years of age or older",
                        "abbr": "Disability Status and Types",
                        "sort": 1
                    },
                    "AGEIND": {
                        "id": "AGEIND",
                        "name": "Disability status and types among adults 18 years of age or older by age group",
                        "abbr": "Age",
                        "sort": 2
                    },
                    "SEXIND": {
                        "id": "SEXIND",
                        "name": "Disability status and types among adults 18 years of age or older by sex",
                        "abbr": "Sex",
                        "sort": 3
                    },
                    "RACEIND": {
                        "id": "RACEIND",
                        "name": "Disability status and types among adults 18 years of age or older by race/ethnicity",
                        "abbr": "Race/Ethnicity",
                        "sort": 4
                    },
                    "VETIND": {
                        "id": "VETIND",
                        "name": "Disability status and types among adults 18 years of age or older by veteran status",
                        "abbr": "Veteran Status",
                        "sort": 5
                    },
                    "INCOMEN": {
                        "id": "INCOMEN",
                        "name": "Income level among adults 18 years of age or older",
                        "abbr": "Income Level",
                        "sort": 6
                    },
                    "EDUCATE": {
                        "id": "EDUCATE",
                        "name": "Education level among adults 18 years of age or older",
                        "abbr": "Education Level",
                        "sort": 7
                    },
                    "MARRIED": {
                        "id": "MARRIED",
                        "name": "Marital status among adults 18 years of age or older",
                        "abbr": "Marital Status",
                        "sort": 8
                    },
                    "JOB": {
                        "id": "JOB",
                        "name": "Employment status among adults 18 years of age or older",
                        "abbr": "Employment Status",
                        "sort": 9
                    },
                    "BINGE": {
                        "id": "BINGE",
                        "name": "Binge drinking in the past 30 days among adults 18 years of age or older",
                        "abbr": "Binge Drinking in Past 30 Days",
                        "sort": 10
                    },
                    "BMI": {
                        "id": "BMI",
                        "name": "Body mass index category among adults 18 years of age or older",
                        "abbr": "Body Mass Index Category",
                        "sort": 11
                    },
                    "AEROBIC": {
                        "id": "AEROBIC",
                        "name": "Aerobic physical activity level among adults 18 years of age or older",
                        "abbr": "Aerobic Physical Activity",
                        "sort": 12
                    },
                    "PAGUIDE": {
                        "id": "PAGUIDE",
                        "name": "Meeting the physical activity guidelines among adults 18 years of age or older",
                        "abbr": "Physical Activity Guidelines",
                        "sort": 13
                    },
                    "SMOKE": {
                        "id": "SMOKE",
                        "name": "Smoking status among adults 18 years of age or older",
                        "abbr": "Smoking Status",
                        "sort": 14
                    },
                    "QUITSMK": {
                        "id": "QUITSMK",
                        "name": "Attempted to quit smoking in the past 12 months among adults 18 years of age or older who are current every day smokers",
                        "abbr": "Attempted to Quit Smoking in Past 12 Months",
                        "sort": 15
                    },
                    "ECIG": {
                        "id": "ECIG",
                        "name": "Current e-cigarette use among adults 18 years of age or older",
                        "abbr": "Currently Use E-Cigarettes",
                        "sort": 16
                    },
                    "TESTEVER": {
                        "id": "TESTEVER",
                        "name": "Ever been tested for HIV among adults 18 to 64 years of age",
                        "abbr": "Tested for HIV",
                        "sort": 17
                    },
                    "MAM2YR": {
                        "id": "MAM2YR",
                        "name": "Mammogram in the past 2 years among females 50 to 74 years of age",
                        "abbr": "Mammogram in Past 2 Years",
                        "sort": 18
                    },
                    "UTDCERV": {
                        "id": "UTDCERV",
                        "name": "Up-to-date cervical cancer screening among females 21 to 65 years of age",
                        "abbr": "Up-to-date cervical cancer screening",
                        "sort": 19
                    },
                    "UTDCRC": {
                        "id": "UTDCRC",
                        "name": "Up-to-date colorectal cancer screening among adults 50 to 75 years of age",
                        "abbr": "Up-to-date Colorectal Cancer Screening",
                        "sort": 20
                    },
                    "PHYSICAL": {
                        "id": "PHYSICAL",
                        "name": "Routine check-up in the past year among adults 18 years of age or older",
                        "abbr": "Routine Check-up in Past Year",
                        "sort": 21
                    },
                    "DENTIST": {
                        "id": "DENTIST",
                        "name": "Visited a dentist in the past year among adults 18 years of age or older",
                        "abbr": "Visited Dentist in Past Year",
                        "sort": 22
                    },
                    "FLUVAC": {
                        "id": "FLUVAC",
                        "name": "Had a flu vaccine in the past 12 months among adults 18 years of age or older",
                        "abbr": "Flu Vaccine in Past 12 Months",
                        "sort": 23
                    },
                    "BARRIER": {
                        "id": "BARRIER",
                        "name": "Could not see a doctor due to cost in the past 12 months among adults 18 years of age or older",
                        "abbr": "Could Not See a Doctor Due to Cost in Past 12 Months",
                        "sort": 24
                    },
                    "PROVIDER": {
                        "id": "PROVIDER",
                        "name": "Personal doctor or health care provider among adults 18 years of age or older",
                        "abbr": "Have a Personal Doctor",
                        "sort": 25
                    },
                    "INSURE": {
                        "id": "INSURE",
                        "name": "Health care coverage among adults 18 years of age or older",
                        "abbr": "Have Health Care Coverage",
                        "sort": 26
                    },
                    "FALL12M": {
                        "id": "FALL12M",
                        "name": "Fallen in the past 12 months among adults 45 years of age or older",
                        "abbr": "Fallen in Past 12 Months",
                        "sort": 27
                    },
                    "HEALTH": {
                        "id": "HEALTH",
                        "name": "Fair or poor self-rated health among adults 18 years of age or older",
                        "abbr": "Fair or Poor Self-Rated Health",
                        "sort": 28
                    },
                    "PHDAYS": {
                        "id": "PHDAYS",
                        "name": "Physically unhealthy days in the past 30 days among adults 18 years of age or older",
                        "abbr": "Physically Unhealthy Days in Past 30 Days",
                        "sort": 29
                    },
                    "HEART": {
                        "id": "HEART",
                        "name": "Heart disease among adults 18 years of age or older",
                        "abbr": "Have Heart Disease",
                        "sort": 30
                    },
                    "HBP": {
                        "id": "HBP",
                        "name": "Ever had high blood pressure among adults 18 years of age or older",
                        "abbr": "Ever Had High Blood Pressure",
                        "sort": 31
                    },
                    "HBPMED": {
                        "id": "HBPMED",
                        "name": "Taking medicine for high blood pressure among adults 18 years of age or older who have high blood pressure",
                        "abbr": "Taking Medicine for High Blood Pressure",
                        "sort": 32
                    },
                    "HICHOL": {
                        "id": "HICHOL",
                        "name": "Ever had high cholesterol among adults 18 years of age or older",
                        "abbr": "Ever Had High Cholesterol",
                        "sort": 33
                    },
                    "SLEEPHRS": {
                        "id": "SLEEPHRS",
                        "name": "Average hours of sleep in a 24-hour period among adults 18 years of age or older",
                        "abbr": "Hours of Sleep in 24-hour Period",
                        "sort": 34
                    },
                    "ARTHRITIS": {
                        "id": "ARTHRITIS",
                        "name": "Ever had arthritis among adults 18 years of age or older",
                        "abbr": "Ever Had Arthritis",
                        "sort": 35
                    },
                    "ASTHMA": {
                        "id": "ASTHMA",
                        "name": "Current asthma among adults 18 years of age or older",
                        "abbr": "Currently Have Asthma",
                        "sort": 36
                    },
                    "OTHCAN": {
                        "id": "OTHCAN",
                        "name": "Ever had cancer (excluding skin cancer) among adults 18 years of age or older",
                        "abbr": "Ever Had Cancer (excluding skin cancer)",
                        "sort": 37
                    },
                    "COPD": {
                        "id": "COPD",
                        "name": "Chronic obstructive pulmonary disease (COPD) among adults 18 years of age or older",
                        "abbr": "Have Chronic Obstructive Pulmonary Disease (COPD)",
                        "sort": 38
                    },
                    "DIAB": {
                        "id": "DIAB",
                        "name": "Diabetes among adults 18 years of age or older",
                        "abbr": "Have Diabetes",
                        "sort": 39
                    },
                    "STROKE": {
                        "id": "STROKE",
                        "name": "Ever had a stroke among adults 18 years of age or older",
                        "abbr": "Ever Had a Stroke",
                        "sort": 40
                    },
                    "DEPRESS": {
                        "id": "DEPRESS",
                        "name": "Ever had depression among adults 18 years of age or older",
                        "abbr": "Ever Had Depression",
                        "sort": 41
                    },
                    "MHDAYS": {
                        "id": "MHDAYS",
                        "name": "Mentally unhealthy days in the past 30 days among adults 18 years of age or older",
                        "abbr": "Mentally Unhealthy Days in Past 30 Days",
                        "sort": 42
                    }
                },
                "Response": {
                    "AEROBIC01": {
                        "id": "AEROBIC01",
                        "name": "Sufficiently Active",
                        "sort": 1
                    },
                    "AGE01": {
                        "id": "AGE01",
                        "name": "18 - 44",
                        "sort": 1
                    },
                    "BMI01": {
                        "id": "BMI01",
                        "name": "Underweight",
                        "sort": 1
                    },
                    "DAYS01": {
                        "id": "DAYS01",
                        "name": "0 Days",
                        "sort": 1
                    },
                    "EDUCATE01": {
                        "id": "EDUCATE01",
                        "name": "Some High School or Less",
                        "sort": 1
                    },
                    "INCOME01": {
                        "id": "INCOME01",
                        "name": "<$15,000",
                        "sort": 1
                    },
                    "JOB01": {
                        "id": "JOB01",
                        "name": "Employed",
                        "sort": 1
                    },
                    "MARRIED01": {
                        "id": "MARRIED01",
                        "name": "Married / Unmarried Couple",
                        "sort": 1
                    },
                    "PAGUIDE01": {
                        "id": "PAGUIDE01",
                        "name": "Meets Both Aerobic and Muscle Strengthening",
                        "sort": 1
                    },
                    "PROVIDER02": {
                        "id": "PROVIDER02",
                        "name": "1 Provider",
                        "sort": 1
                    },
                    "Q6COG": {
                        "id": "Q6COG",
                        "name": "Cognitive Disability",
                        "sort": 1
                    },
                    "Q6DIS1": {
                        "id": "Q6DIS1",
                        "name": "Any Disability",
                        "sort": 1
                    },
                    "RACE01": {
                        "id": "RACE01",
                        "name": "White, non-Hispanic",
                        "sort": 1
                    },
                    "SEX01": {
                        "id": "SEX01",
                        "name": "Male",
                        "sort": 1
                    },
                    "SLEEPHRS01": {
                        "id": "SLEEPHRS01",
                        "name": "1 - 6 Hours",
                        "sort": 1
                    },
                    "SMOKE01": {
                        "id": "SMOKE01",
                        "name": "Current Smoker",
                        "sort": 1
                    },
                    "VET1": {
                        "id": "VET1",
                        "name": "Veteran",
                        "sort": 1
                    },
                    "YESNO01": {
                        "id": "YESNO01",
                        "name": "Yes",
                        "sort": 1
                    },
                    "AEROBIC02": {
                        "id": "AEROBIC02",
                        "name": "Insufficiently Active",
                        "sort": 2
                    },
                    "AGE02": {
                        "id": "AGE02",
                        "name": "45 - 64",
                        "sort": 2
                    },
                    "BMI02": {
                        "id": "BMI02",
                        "name": "Normal Weight",
                        "sort": 2
                    },
                    "DAYS02": {
                        "id": "DAYS02",
                        "name": "1 - 13 Days",
                        "sort": 2
                    },
                    "EDUCATE02": {
                        "id": "EDUCATE02",
                        "name": "High School Graduate",
                        "sort": 2
                    },
                    "INCOME02": {
                        "id": "INCOME02",
                        "name": "$15,000 to <$25,000",
                        "sort": 2
                    },
                    "JOB02": {
                        "id": "JOB02",
                        "name": "Out of Work",
                        "sort": 2
                    },
                    "MARRIED02": {
                        "id": "MARRIED02",
                        "name": "Divorced / Separated",
                        "sort": 2
                    },
                    "PAGUIDE02": {
                        "id": "PAGUIDE02",
                        "name": "Meets Aerobic Only",
                        "sort": 2
                    },
                    "PROVIDER03": {
                        "id": "PROVIDER03",
                        "name": "2+ Providers",
                        "sort": 2
                    },
                    "Q6DIS2": {
                        "id": "Q6DIS2",
                        "name": "No Disability",
                        "sort": 2
                    },
                    "Q6HEAR": {
                        "id": "Q6HEAR",
                        "name": "Hearing Disability",
                        "sort": 2
                    },
                    "RACE02": {
                        "id": "RACE02",
                        "name": "Black, non-Hispanic",
                        "sort": 2
                    },
                    "SEX02": {
                        "id": "SEX02",
                        "name": "Female",
                        "sort": 2
                    },
                    "SLEEPHRS02": {
                        "id": "SLEEPHRS02",
                        "name": "7 - 9 Hours",
                        "sort": 2
                    },
                    "SMOKE02": {
                        "id": "SMOKE02",
                        "name": "Former Smoker",
                        "sort": 2
                    },
                    "VET2": {
                        "id": "VET2",
                        "name": "Non-Veteran",
                        "sort": 2
                    },
                    "YESNO02": {
                        "id": "YESNO02",
                        "name": "No",
                        "sort": 2
                    },
                    "AEROBIC03": {
                        "id": "AEROBIC03",
                        "name": "Inactive",
                        "sort": 3
                    },
                    "AGE03": {
                        "id": "AGE03",
                        "name": "65+",
                        "sort": 3
                    },
                    "BMI03": {
                        "id": "BMI03",
                        "name": "Overweight",
                        "sort": 3
                    },
                    "DAYS03": {
                        "id": "DAYS03",
                        "name": "14+ Days",
                        "sort": 3
                    },
                    "EDUCATE03": {
                        "id": "EDUCATE03",
                        "name": "College Graduate",
                        "sort": 3
                    },
                    "INCOME03": {
                        "id": "INCOME03",
                        "name": "$25,000 to <$35,000",
                        "sort": 3
                    },
                    "JOB03": {
                        "id": "JOB03",
                        "name": "Unable to Work",
                        "sort": 3
                    },
                    "MARRIED03": {
                        "id": "MARRIED03",
                        "name": "Widowed",
                        "sort": 3
                    },
                    "PAGUIDE03": {
                        "id": "PAGUIDE03",
                        "name": "Meets Muscle Strengthening Only",
                        "sort": 3
                    },
                    "Q6MOB": {
                        "id": "Q6MOB",
                        "name": "Mobility Disability",
                        "sort": 3
                    },
                    "RACE03": {
                        "id": "RACE03",
                        "name": "Hispanic",
                        "sort": 3
                    },
                    "SLEEPHRS03": {
                        "id": "SLEEPHRS03",
                        "name": "10+ Hours",
                        "sort": 3
                    },
                    "SMOKE03": {
                        "id": "SMOKE03",
                        "name": "Never Smoker",
                        "sort": 3
                    },
                    "BMI04": {
                        "id": "BMI04",
                        "name": "Obese",
                        "sort": 4
                    },
                    "INCOME04": {
                        "id": "INCOME04",
                        "name": "$35,000 to <$50,000",
                        "sort": 4
                    },
                    "JOB04": {
                        "id": "JOB04",
                        "name": "Other",
                        "sort": 4
                    },
                    "MARRIED04": {
                        "id": "MARRIED04",
                        "name": "Never Married",
                        "sort": 4
                    },
                    "PAGUIDE04": {
                        "id": "PAGUIDE04",
                        "name": "Meets Neither",
                        "sort": 4
                    },
                    "PROVIDER01": {
                        "id": "PROVIDER01",
                        "name": "None",
                        "sort": 4
                    },
                    "Q6VIS": {
                        "id": "Q6VIS",
                        "name": "Vision Disability",
                        "sort": 4
                    },
                    "RACE05": {
                        "id": "RACE05",
                        "name": "Asian, non-Hispanic",
                        "sort": 4
                    },
                    "INCOME05": {
                        "id": "INCOME05",
                        "name": "$50,000 +",
                        "sort": 5
                    },
                    "Q6SEL": {
                        "id": "Q6SEL",
                        "name": "Self-care Disability",
                        "sort": 5
                    },
                    "RACE06": {
                        "id": "RACE06",
                        "name": "Native Hawaiian or Other Pacific Islander, non-Hispanic",
                        "sort": 5
                    },
                    "Q6IND": {
                        "id": "Q6IND",
                        "name": "Independent Living Disability",
                        "sort": 6
                    },
                    "RACE07": {
                        "id": "RACE07",
                        "name": "American Indian or Alaska Native, non-Hispanic",
                        "sort": 6
                    },
                    "RACE04": {
                        "id": "RACE04",
                        "name": "Other / Multirace, non-Hispanic",
                        "sort": 7
                    }
                },
                "Stratification": {
                    "AGE01": {
                        "id": "AGE01",
                        "name": "18 - 44",
                        "sort": 1,
                        "parent": "AGEGRP"
                    },
                    "AGE04": {
                        "id": "AGE04",
                        "name": "18 - 24",
                        "sort": 1,
                        "parent": "AGEGRP"
                    },
                    "AGE06": {
                        "id": "AGE06",
                        "name": "20 - 44",
                        "sort": 1,
                        "parent": "AGEGRP"
                    },
                    "AGE07": {
                        "id": "AGE07",
                        "name": "21 - 35",
                        "sort": 1,
                        "parent": "AGEGRP"
                    },
                    "AGE10": {
                        "id": "AGE10",
                        "name": "40 - 49",
                        "sort": 1,
                        "parent": "AGEGRP"
                    },
                    "BO1": {
                        "id": "BO1",
                        "name": "Overall",
                        "sort": 1,
                        "parent": "CAT1"
                    },
                    "COGDIS": {
                        "id": "COGDIS",
                        "name": "Cognitive Disability",
                        "sort": 1,
                        "parent": "DISTYPE"
                    },
                    "DISABL": {
                        "id": "DISABL",
                        "name": "Any Disability",
                        "sort": 1,
                        "parent": "DISSTAT"
                    },
                    "GENM": {
                        "id": "GENM",
                        "name": "Male",
                        "sort": 1,
                        "parent": "SEX"
                    },
                    "WHT": {
                        "id": "WHT",
                        "name": "White, non-Hispanic",
                        "sort": 1,
                        "parent": "RACE"
                    },
                    "AGE02": {
                        "id": "AGE02",
                        "name": "45 - 64",
                        "sort": 2,
                        "parent": "AGEGRP"
                    },
                    "AGE05": {
                        "id": "AGE05",
                        "name": "25 - 44",
                        "sort": 2,
                        "parent": "AGEGRP"
                    },
                    "AGE08": {
                        "id": "AGE08",
                        "name": "36 - 50",
                        "sort": 2,
                        "parent": "AGEGRP"
                    },
                    "AGE11": {
                        "id": "AGE11",
                        "name": "50 - 64",
                        "sort": 2,
                        "parent": "AGEGRP"
                    },
                    "BLK": {
                        "id": "BLK",
                        "name": "Black, non-Hispanic",
                        "sort": 2,
                        "parent": "RACE"
                    },
                    "GENF": {
                        "id": "GENF",
                        "name": "Female",
                        "sort": 2,
                        "parent": "SEX"
                    },
                    "HEARDIS": {
                        "id": "HEARDIS",
                        "name": "Hearing Disability",
                        "sort": 2,
                        "parent": "DISTYPE"
                    },
                    "NODIS": {
                        "id": "NODIS",
                        "name": "No Disability",
                        "sort": 2,
                        "parent": "DISSTAT"
                    },
                    "AGE03": {
                        "id": "AGE03",
                        "name": "65+",
                        "sort": 3,
                        "parent": "AGEGRP"
                    },
                    "AGE09": {
                        "id": "AGE09",
                        "name": "51 - 65",
                        "sort": 3,
                        "parent": "AGEGRP"
                    },
                    "HIS": {
                        "id": "HIS",
                        "name": "Hispanic",
                        "sort": 3,
                        "parent": "RACE"
                    },
                    "MOBDIS": {
                        "id": "MOBDIS",
                        "name": "Mobility Disability",
                        "sort": 3,
                        "parent": "DISTYPE"
                    },
                    "MRC": {
                        "id": "MRC",
                        "name": "Other / Multirace, non-Hispanic",
                        "sort": 4,
                        "parent": "RACE"
                    },
                    "VISDIS": {
                        "id": "VISDIS",
                        "name": "Vision Disability",
                        "sort": 4,
                        "parent": "DISTYPE"
                    },
                    "SELFDIS": {
                        "id": "SELFDIS",
                        "name": "Self-care Disability",
                        "sort": 5,
                        "parent": "DISTYPE"
                    },
                    "INDDIS": {
                        "id": "INDDIS",
                        "name": "Independent Living Disability",
                        "sort": 6,
                        "parent": "DISTYPE"
                    }
                },
                "StratificationCategory": {
                    "AGEGRP": {
                        "id": "AGEGRP",
                        "name": "Age Group",
                        "sort": 1
                    },
                    "CAT1": {
                        "id": "CAT1",
                        "name": "Overall",
                        "sort": 1
                    },
                    "DISSTAT": {
                        "id": "DISSTAT",
                        "name": "Disability Status",
                        "sort": 1
                    },
                    "DISTYPE": {
                        "id": "DISTYPE",
                        "name": "Disability Type",
                        "sort": 2
                    },
                    "SEX": {
                        "id": "SEX",
                        "name": "Sex",
                        "sort": 2
                    },
                    "RACE": {
                        "id": "RACE",
                        "name": "Race/Ethnicity",
                        "sort": 3
                    }
                },
                "Topic": {
                    "DISEST": {
                        "id": "DISEST",
                        "name": "Disability Estimates",
                        "sort": 1
                    },
                    "DEMOG": {
                        "id": "DEMOG",
                        "name": "Demographics",
                        "sort": 2
                    },
                    "HLTHRB": {
                        "id": "HLTHRB",
                        "name": "Health Risks & Behaviors",
                        "sort": 3
                    },
                    "PREVENT": {
                        "id": "PREVENT",
                        "name": "Prevention & Screenings",
                        "sort": 4
                    },
                    "BARRIER": {
                        "id": "BARRIER",
                        "name": "Barriers & Costs of Health Care",
                        "sort": 5
                    },
                    "GENHLTH": {
                        "id": "GENHLTH",
                        "name": "General Health Conditions",
                        "sort": 6
                    },
                    "CHRCOND": {
                        "id": "CHRCOND",
                        "name": "Chronic Conditions",
                        "sort": 7
                    },
                    "MHLTH": {
                        "id": "MHLTH",
                        "name": "Mental & Emotional Health",
                        "sort": 8
                    }
                },
                "Year": {
                    "YR1": {
                        "id": "YR1",
                        "name": "2016",
                        "sort": 1
                    }
                }
            };

            var jsonData = [
            {
                "qi": "STATTYPE",
                "yr": "YR1",
                "sc1": "CAT1",
                "s1": "BO1",
                "rs": "Q6HEAR",
                "dvt": "AGEADJPREV",
                "dv": 4.5,
                "lci": 4,
                "hci": 5,
                "wn": 1335697
            },
            {
                "qi": "STATTYPE",
                "yr": "YR1",
                "sc1": "CAT1",
                "s1": "BO1",
                "rs": "Q6VIS",
                "dvt": "AGEADJPREV",
                "dv": 4.2,
                "lci": 3.7,
                "hci": 4.7,
                "wn": 1236853
            },
            {
                "qi": "STATTYPE",
                "yr": "YR1",
                "sc1": "CAT1",
                "s1": "BO1",
                "rs": "Q6SEL",
                "dvt": "AGEADJPREV",
                "dv": 3.3,
                "lci": 2.9,
                "hci": 3.8,
                "wn": 993955
            },
            {
                "qi": "STATTYPE",
                "yr": "YR1",
                "sc1": "CAT1",
                "s1": "BO1",
                "rs": "Q6IND",
                "dvt": "AGEADJPREV",
                "dv": 5.8,
                "lci": 5.2,
                "hci": 6.4,
                "wn": 1682258
            },
            {
                "qi": "STATTYPE",
                "yr": "YR1",
                "sc1": "CAT1",
                "s1": "BO1",
                "rs": "Q6DIS1",
                "dvt": "AGEADJPREV",
                "dv": 22.3,
                "lci": 21.3,
                "hci": 23.3,
                "wn": 6479729
            },
            {
                "qi": "STATTYPE",
                "yr": "YR1",
                "sc1": "CAT1",
                "s1": "BO1",
                "rs": "Q6DIS2",
                "dvt": "AGEADJPREV",
                "dv": 77.7,
                "lci": 76.7,
                "hci": 78.7,
                "wn": 21821005
            },
            {
                "qi": "STATTYPE",
                "yr": "YR1",
                "sc1": "CAT1",
                "s1": "BO1",
                "rs": "Q6COG",
                "dvt": "AGEADJPREV",
                "dv": 9.5,
                "lci": 8.8,
                "hci": 10.2,
                "wn": 2718561
            },
            {
                "qi": "STATTYPE",
                "yr": "YR1",
                "sc1": "CAT1",
                "s1": "BO1",
                "rs": "Q6MOB",
                "dvt": "AGEADJPREV",
                "dv": 11.2,
                "lci": 10.5,
                "hci": 12,
                "wn": 3358303
            }
        ]; 
            //extract data
            var categoryCodes = [];
            var categoryTitles = [];
            var confidenceIndicators = [];
            var dataValues = [];           
            var wns = []; 
            var legendKeys = [];
            var legendColorKeyWidth = 20;
            var legendColorKeyHeight = 20;
            var tooltipDisplay = []; //data displays in tooltip

            function getCategoryTitle_Rs_FromLku (obj) {
                var rs = obj.rs; 
                var lku = lookUpObject.Response; 
                categoryTitles.push(lku[rs].name);
                return;
            }; 

            function get_Wn_FromLku (obj) {
                var wn = obj.wn; 
                wns.push(wn);
                return;
            }; 

            function getLegendKey_S1_FromLku (obj) {
                var strat = obj.s1; 
                var lku = lookUpObject.Stratification; 
                var legendTitle = lku[strat].name;
                if (legendKeys.indexOf(legendTitle) > -1) { 
                    return;
                } else {
                    legendKeys.push(legendTitle);
                    return;
                }
            }; 

            function make_tooltip_display (obj) {   
                var rs = obj.rs; 
                var lku = lookUpObject.Response;  
                tooltipDisplay.push({
                    title: lku[rs].name,
                    dv: obj.dv,
                    lci: obj.lci, 
                    hci: obj.hci,
                    wn: obj.wn
                });
                return;
            }

            jsonData.forEach(function (obj) {
                var value = obj.dv; 
                var category = obj.rs;
                var confidenceIndicator = {
                    lci: obj.lci, 
                    hci: obj.hci
                }; 
                dataValues.push(value); 
                categoryCodes.push(category);
                confidenceIndicators.push(confidenceIndicator);
                getCategoryTitle_Rs_FromLku (obj); 
                get_Wn_FromLku(obj);  
                getLegendKey_S1_FromLku (obj); 
                make_tooltip_display(obj);
                return;
            }); //Compatible in Chrome 

            //chart
            var margin = {top: 30, right: 0, bottom: 220, left: 50};
            var width = 700 - margin.left - margin.right;
            var height = 700 - margin.top - margin.bottom;
            var spaceFromTop = height + margin.top; 
            var totalWidth = width + margin.left + margin.right; 
            var totalHeight = height + margin.top + margin.bottom;
            var CHART_TOP_BUFFER_VALUE = 10; //this value must be approved by the team. Test 5-10.

            //tool tip
            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            //scale
            var x = d3.scaleBand()
                .domain(categoryTitles) 
                .rangeRound([0, width]) //total width 
                .padding(0.1);
            var y = d3.scaleLinear()
                //provides a max-value buffer
                .domain([0, d3.max(dataValues) + CHART_TOP_BUFFER_VALUE])
                .range([height, 0]);

            //gridlines in y axis 
            function make_y_gridlines() {
                return d3.axisLeft(y)
            }

            //chart
            var chart = d3.select(".chart")
                // FIX: Chart re-size in IE11 and Chrome. 
                //when "height" is off, Chrome works. When it's on, IE works.
                .attr("height", "700") 
                .attr("viewBox", function () {
                    return "0 0 700 700";
                }) //min-x, min-y, width, height
                .attr("preserveAspectRatio", "xMinYMin meet"); 

             //create bar grouping
            var bar = chart.selectAll("g"); //grouping includes bar & text  

            // add the Y gridlines
            chart.append("g")			
                .attr("class", "grid")
                .call(make_y_gridlines()
                    .tickSize(-width) //full graph width
                    .tickFormat("") //remove label
                )
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");    
            
            //bars
            bar = bar.data(categoryTitles) 
                .enter()
                .append("g") 
                .attr("transform", function (d) { //position bars
                    var spaceLeft = x.bandwidth() + x(d);
                    return "translate(" + spaceLeft + ", " + margin.top + ")";  
                }); 
                console.log('data: ', tooltipDisplay);
            bar.append("rect")
                .data(dataValues)
                .attr("y", function (d) { return y(d); }) //y coordinate
                .attr("height", function (d) { return height - y(d); }) //height
                .attr("width", function (d, i) { return x.bandwidth() / 3; })
                .data(tooltipDisplay)
                .on("mouseover", function (d, i) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html(`
                        <h3>${d.title}</h3> 
                        <h3>${d.dv}</h3>
                        CI (${d.lci} - ${d.hci})
                        <br />WN = ${d.wn}
                    `) // Compatible in Chrome
                    // div.html("Lorem ipsum") // Make compatible in IE11, Chrome                   
                        .style("left", (d3.event.pageX - 70) + "px")
                        .style("top", (d3.event.pageY - 90) + "px");
                })
                .on("mouseout", function (d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                }); 
            //confidence indicator line
            var line = bar.append("line")
                .attr("class", "confidence_indicator")
                .data(confidenceIndicators)
                .attr("x1", function () { return x.bandwidth() / 6; })
                .attr("y1", function (d) { return y(d.lci); }) //start line
                .attr("x2", function () { return x.bandwidth() / 6; }) //end line
                .attr("y2", function (d) { return y(d.hci); });
            //confidence indicator linecaps
            var linecapHalfWidth = 5; 
            var linecap_top = bar.append("line")
                .attr("class", "linecap_top")
                .data(confidenceIndicators)
                .attr("x1", function () { return x.bandwidth() / 6 - linecapHalfWidth; })
                .attr("y1", function (d) { return y(d.hci); })
                .attr("x2", function () { return x.bandwidth() / 6 + linecapHalfWidth; })
                .attr("y2", function (d) { return y(d.hci); });
            var linecap_bottom = bar.append("line")
                .attr("class", "linecap_top")
                .data(confidenceIndicators)
                .attr("x1", function () { return x.bandwidth() / 6 - linecapHalfWidth; })
                .attr("y1", function (d) { return y(d.lci); })
                .attr("x2", function () { return x.bandwidth() / 6 + linecapHalfWidth; })
                .attr("y2", function (d) { return y(d.lci); });

            //axes labels
            var yAxisMidpoint = (height + margin.top)/2 + margin.top;    
            var paddingLeft = 14;         
            var yAxisTitle = chart.append("text")
                .attr("class", "label")
                .attr("id", "y_axis_label")
                .text("Title (data value unit)") //REFACTOR - GET UNIT VALUES
                .attr("transform", "translate(" + paddingLeft + ", " + yAxisMidpoint + ")rotate(-90)")                
                .attr("text-anchor", "middle");         
            
            //axes
            var xAxis = chart.append("g")
                .attr("class", "axis")             
                .attr("transform", "translate(" + margin.left + ", " + spaceFromTop + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-45)");
            var yAxis = chart.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
                .call(d3.axisLeft(y))
                .select(".domain").remove(); //remove y-axis line

            //legend 
            var legend = chart.append("g")
                .attr("class", "legend")
            legend.append("rect")
                .attr("x", width / 2 - legendColorKeyWidth)
                .attr("y", height + margin.bottom)
                .attr("width", legendColorKeyWidth)
                .attr("height", legendColorKeyHeight); //where is the color coming from?
            legend.append("text")
                .data(legendKeys)
                .attr("x", width / 2 + 10) //REFACTOR - MAKE SPACING DYNAMIC, REPEATABLE
                .attr("y", height + margin.bottom + 13)
                .text(function (d) { return d; });
} 
