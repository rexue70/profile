import axios from "axios";
import {FETCH_MY_PROFILE_DATA, UPDATE_PRIVACY, SEARCH_STUDENT,
    UPDATE_SKILL, UPDATE_ABOUT, UPDATE_IMAGE, UPDATE_EXTRA_EXPERIENCE, ADD_EXTRA_EXPERIENCE, DELETE_EXTRA_EXPERIENCE,
    UPDATE_PROJECT, ADD_PROJECT, DELETE_PROJECT, UPDATE_SUMMARY,SET_LOGIN_INFO, DO_LOGIN, CLEAR_LOGIN} from '../actions/types'
import {
    HOST, API_DELETE_EXTRA_EXPERIENCE, API_DELETE_PROJECT, API_GET_MY_PROFILE, API_POST_EXTRA_EXPERIENCE,
    API_POST_LOGIN, API_POST_PROJECT, API_PUT_EXTRA_EXPERIENCE, API_PUT_PRIVACY, API_PUT_PROJECT,
    API_PUT_STUDENTRECORD, API_POST_SEARCH_STUDENT, API_PUT_STUDENT_PHOTO
} from "./apis";

export function fetchMyProfile(login) {
    return (dispatch) => {
        let neuid = login.id;
        let myToken = login.token;
        axios.get(
            (HOST + API_GET_MY_PROFILE).format(neuid),
            {headers: {
                    "Content-Type": "application/json",
                    "token" : myToken
                }})
            .then(
                (response) => {
                    dispatch({type: FETCH_MY_PROFILE_DATA, payload: response.data});
                },
                (error) => {
                    alert("Server error!", error);
                    console.log(error);
                })
    }
}

export function updateSummary(summary) {
    return (dispatch, getState) => {
        let state = getState().myProfileReducer;
        let neuid = state.LoginInfo.id;
        let myToken = state.LoginInfo.token;
        let data = JSON.stringify({...state.StudentRecord, summary: summary});
        console.log("state", state);
        console.log("mytoken", myToken);
        console.log("neuid", neuid);
        console.log("data", data);
        axios.put(
            (HOST + API_PUT_STUDENTRECORD).format(neuid),
            data,
            {headers: {
                    "Content-Type": "application/json",
                    "token" : myToken
                }})
            .then(
                (response) => {
                    dispatch({type: UPDATE_SUMMARY, payload: summary});
                    console.log("Send request successfully.");
                },
                (error) => {
                    alert("Server error!");
                    console.log(error);
                })
    }
}

export function updateImage(photo) {
    return (dispatch, getState) => {
        let state = getState().myProfileReducer;
        let neuid = state.LoginInfo.id;
        let myToken = state.LoginInfo.token;
        console.log("state", state);
        console.log("mytoken", myToken);
        console.log("neuid", neuid);
        axios.put(
            (HOST + API_PUT_STUDENT_PHOTO).format(neuid),
            photo,
            {headers: {
                "Content-Type": "application/json",
                    "token" : myToken
                }})
            .then(
                (response) => {
                    dispatch({type: UPDATE_IMAGE, payload: photo});
                    console.log("Send request successfully.");},
                (error) => {
                    alert("Server error!");
                    console.log(error);
                })
            }
    }


export function updatePrivacy(privacy) {
    return (dispatch, getState) => {
        let neuid = getState().myProfileReducer.LoginInfo.id;
        let myToken = getState().myProfileReducer.LoginInfo.token;
        let data = JSON.stringify(privacy);
        axios.put(
            (HOST + API_PUT_PRIVACY).format(neuid),
            data,
            {headers: {
                "Content-Type": "application/json",
                "token" : myToken
            }})
            .then(
                (response) => {
                    dispatch({type: UPDATE_PRIVACY, payload: privacy});
                    console.log("Send request successfully.");
                },
                (error) => {
                    alert("Server error!");
                    console.log(error);
                })
    }
}

export function updateSkill(skills) {
    return (dispatch, getState) => {
        let state = getState().myProfileReducer;
        let neuid = state.LoginInfo.id;
        let myToken = state.LoginInfo.token;
        let data = JSON.stringify({...state.StudentRecord, skills: skills});
        axios.put(
            (HOST + API_PUT_STUDENTRECORD).format(neuid),
            data,
            {headers: {
                    "Content-Type": "application/json",
                    "token" : myToken
                }})
            .then(
                (response) => {
                    dispatch({type: UPDATE_SKILL, payload: skills});
                    console.log("Send request successfully.");
                },
                (error) => {
                    alert("Server error!");
                    console.log(error);
                })
    }
}

export function updateAbout(about) {
    return (dispatch,getState) => {
        let neuid = getState().myProfileReducer.LoginInfo.id;
        let myToken = getState().myProfileReducer.LoginInfo.token;
        let data = JSON.stringify(about);
        axios.put(
            (HOST + API_PUT_STUDENTRECORD).format(neuid),
            data,
            {headers: {
                    "Content-Type": "application/json",
                    "token" : myToken
                }})
            .then(
                (response) => {
                    dispatch({type: UPDATE_ABOUT, payload: about});
                    console.log("Send request successfully.");
                },
                (error) => {
                    alert("Server error!");
                    console.log(error);
                })
    }

}

export function updateExtraExperience(experience) {
    return (dispatch, getState) => {
        let neuid = getState().myProfileReducer.LoginInfo.id;
        let myToken = getState().myProfileReducer.LoginInfo.token;
        let data = JSON.stringify(experience);
        axios.put(
            (HOST + API_PUT_EXTRA_EXPERIENCE).format(neuid, experience.extraExperienceId),
            data,
            {headers: {
                    "Content-Type": "application/json",
                    "token" : myToken
                }})
            .then(
                (response) => {
                    dispatch({type: UPDATE_EXTRA_EXPERIENCE, payload: experience});
                    console.log("Send request successfully.");
                },
                (error) => {
                    alert("Server error!");
                    console.log(error);
                })
    }
}

export function addExtraExperience(experience) {
    return (dispatch, getState) => {
        let neuid = getState().myProfileReducer.LoginInfo.id;
        let myToken = getState().myProfileReducer.LoginInfo.token;
        let data = JSON.stringify(experience);
        axios.post(
            (HOST + API_POST_EXTRA_EXPERIENCE).format(neuid),
            data,
            {headers: {
                    "Content-Type": "application/json",
                    "token" : myToken
                }})
            .then(
                (response) => {
                    experience = {...experience, extraExperienceId: response.data};
                    dispatch({type: ADD_EXTRA_EXPERIENCE, payload: experience});
                    console.log("Send request successfully.");
                },
                (error) => {
                    alert("Server error!");
                    console.log(error);
                })
    }
}

export function deleteExtraExperience(experience) {
    return (dispatch, getState) => {
        let neuid = getState().myProfileReducer.LoginInfo.id;
        let myToken = getState().myProfileReducer.LoginInfo.token;
        axios.delete(
            (HOST + API_DELETE_EXTRA_EXPERIENCE).format(neuid, experience.extraExperienceId),
            {headers: {
                    "Content-Type": "application/json",
                    "token" : myToken
                }})
            .then(
                (response) => {
                    dispatch({type: DELETE_EXTRA_EXPERIENCE, payload: experience});
                    console.log("Send request successfully.");
                },
                (error) => {
                    alert("Server error!");
                    console.log(error);
                })
    }
}

export function updateProject(project) {
    return (dispatch, getState) => {
        let neuid = getState().myProfileReducer.LoginInfo.id;
        let myToken = getState().myProfileReducer.LoginInfo.token;
        let data = JSON.stringify(project);
        axios.put(
            (HOST + API_PUT_PROJECT).format(neuid, project.projectId),
            data,
            {headers: {
                    "Content-Type": "application/json",
                    "token" : myToken
                }})
            .then(
                (response) => {
                    dispatch({type: UPDATE_PROJECT, payload: project});
                    console.log("Send request successfully.");
                },
                (error) => {
                    alert("Server error!");
                    console.log(error);
                })
    }
}

export function addProject(project) {
    return (dispatch, getState) => {
        let neuid = getState().myProfileReducer.LoginInfo.id;
        let myToken = getState().myProfileReducer.LoginInfo.token;
        let data = JSON.stringify(project);
        axios.post(
            (HOST + API_POST_PROJECT).format(neuid),
            data,
            {headers: {
                    "Content-Type": "application/json",
                    "token" : myToken
                }})
            .then(
                (response) => {
                    project = {...project, projectId: response.data};
                    dispatch({type: ADD_PROJECT, payload: project});
                    console.log("Send request successfully.");
                },
                (error) => {
                    alert("Server error!");
                    console.log(error);
                })
    }
}

export function deleteProject(project) {
    return (dispatch, getState) => {
        let neuid = getState().myProfileReducer.LoginInfo.id;
        let myToken = getState().myProfileReducer.LoginInfo.token;
        axios.delete(
            (HOST + API_DELETE_PROJECT).format(neuid, project.projectId),
            {headers: {
                    "Content-Type": "application/json",
                    "token" : myToken
                }})
            .then(
                (response) => {
                    dispatch({type: DELETE_PROJECT, payload: project});
                    console.log("Send request successfully.");
                },
                (error) => {
                    // alert("Server error!");
                    console.log(error);
                })
    }
}

export function searchStudent(input) {
    return (dispatch, getState) => {
        let myToken = getState().myProfileReducer.LoginInfo.token;
        axios.post(
            (HOST + API_POST_SEARCH_STUDENT),
            input,
            {headers: {
                    "Content-Type": "text/plain",
                    "token" : myToken
                }})
            .then(
                (response) => {
                    let data = response.data.students;
                    dispatch({type: SEARCH_STUDENT, payload: data});
                    console.log("Send request successfully.");
                },
                (error) => {
                    alert("Server error!");
                    console.log(error);
                })
    }
}

export function doLogin(body) {

    return (dispatch) => {
        let logInfo = JSON.stringify({
            username : "studentfetwo@husky.neu.edu",
            password : "password"
        });
        let newLogInfo = JSON.stringify(body);

        axios.post(
            (HOST + API_POST_LOGIN),
            newLogInfo,
            {headers: {
                    "Content-Type": "application/json",
                }})
            .then(
                (response) => {
                    dispatch({type: SET_LOGIN_INFO, payload: response.data}); // For temporary use
                    dispatch(fetchMyProfile(response.data)); // Async request //we should not fetch data here.
                    body.history.push("/myProfile");
                },
                (error) => {
                    alert("Login failed. Server error!");
                    console.log(error);
                })
    }
}

export function clearLogin(){
    return {
        type:CLEAR_LOGIN,
        payload: null
    }
}

// Format url string
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }

    var data = arguments;
    if (arguments.length == 1 && typeof (args) == "object") {
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replace("{" + key + "}", value);
        }
    }
    return result;
};
