import dayjs from "dayjs";

export const projectconstants = {

    showlog: false,
};




export const swalMessages = {
  

    swalErrorMessage: "Something went wrong. Please try again.",
    swalErrorTitle: "Error",

    

};

export const CONSTANTS = {
    END_DATE_ERRROR_MESSAGE: "End date cannot be before start date",

    PLACEHOLDER: "Enter",
    PLACEHOLDERDROPDOWN: "Select",
    REQUIRED_FIELD_MESSAGE: "@ is required",
    NO_DATA_TEXT: "No Data Available",
};

export const Gender_Dropdown = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
];

export const SUBJECTS = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Accountancy",
    "English",
];

export const firstDayOfMonth = dayjs().startOf("month").format("YYYY.MM.DD");
export const lastDayOfMonth = dayjs().endOf("month").format("YYYY.MM.DD");