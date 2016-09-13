import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall } from './ajaxStatusActions';
import { ajaxCallError } from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}
// in real apps add a loadCoursesFailure action!!

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
  return function(dispatch) {// this wrapper function in important
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses()
      .then(courses => dispatch(loadCoursesSuccess(courses)))
      .catch(error => { throw(error); });
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) { // zith getState you can access redux store directly
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course)
      .then(course => {
        course.id ? 
          dispatch(updateCourseSuccess(course)) : 
          dispatch(createCourseSuccess(course));
      })
      .catch(error => { 
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}

