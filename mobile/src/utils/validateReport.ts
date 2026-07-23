/*
|--------------------------------------------------------------------------
| Report Validation Utility
|--------------------------------------------------------------------------
|
| PURPOSE
|
| This file contains all validation rules for the
| Report Incident feature.
|
| WHY?
|
| Keeping validation outside the screen makes the
| ReportIncidentScreen easier to read and maintain.
|
| Later, if the validation rules change, we only
| update this file instead of searching through
| the screen component.
|
*/

/*
|--------------------------------------------------------------------------
| ReportData Interface
|--------------------------------------------------------------------------
|
| Defines the shape of the object we expect to validate.
|
| TypeScript uses this interface to ensure that every
| required property exists before validation begins.
|
*/

export interface ReportData {

    category: string;

    title: string;

    description: string;

}

/*
|--------------------------------------------------------------------------
| ValidationResult Interface
|--------------------------------------------------------------------------
|
| valid
|     Indicates whether every validation rule passed.
|
| errors
|     Stores any validation messages that should be
|     shown to the user.
|
*/

export interface ValidationResult {

    valid: boolean;

    errors: string[];

}

/*
|--------------------------------------------------------------------------
| validateReport()
|--------------------------------------------------------------------------
|
| This function checks whether the report entered by
| the user meets the application's requirements.
|
| INPUT:
|
| {
|     category,
|     title,
|     description
| }
|
| OUTPUT:
|
| {
|     valid: true/false,
|     errors: [...]
| }
|
*/

export function validateReport(

    report: ReportData

): ValidationResult {

    /*
    ------------------------------------------------------------------------
    We create an empty array.

    Every validation error we find will be added here.

    If the array is still empty at the end,
    then the report is valid.
    ------------------------------------------------------------------------
    */

    const errors: string[] = [];

    /*
    ------------------------------------------------------------------------
    Category Validation

    The user must choose a category.

    Although our screen currently selects one by default,
    this rule protects us in case that behaviour changes later.
    ------------------------------------------------------------------------
    */

    if (!report.category.trim()) {

        errors.push(

            "Please select an incident category."

        );

    }

    /*
    ------------------------------------------------------------------------
    Title Validation
    ------------------------------------------------------------------------
    */

    if (!report.title.trim()) {

        errors.push(

            "Incident title is required."

        );

    }

    else if (report.title.trim().length < 5) {

        errors.push(

            "Incident title must contain at least 5 characters."

        );

    }

    else if (report.title.trim().length > 100) {

        errors.push(

            "Incident title cannot exceed 100 characters."

        );

    }

    /*
    ------------------------------------------------------------------------
    Description Validation
    ------------------------------------------------------------------------
    */

    if (!report.description.trim()) {

        errors.push(

            "Please describe the incident."

        );

    }

    else if (report.description.trim().length < 20) {

        errors.push(

            "Description must contain at least 20 characters."

        );

    }

    else if (report.description.trim().length > 500) {

        errors.push(

            "Description cannot exceed 500 characters."

        );

    }

    /*
    ------------------------------------------------------------------------
    Return Result

    If no errors were found:

        valid = true

    Otherwise:

        valid = false
    ------------------------------------------------------------------------
    */

    return {

        valid: errors.length === 0,

        errors,

    };

}