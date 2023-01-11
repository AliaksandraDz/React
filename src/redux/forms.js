// import * as ActionTypes from './ActionTypes';

export const InitialFeedback = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
};

// export const Feedback = (state = { errMess: null, feedback: []}, action) => {
//     switch (action.type) {
//         case ActionTypes.POST_FEEDBACK:
//             var feedback = action.payload;
//             alert(feedback);
//             return {...state, feedback: state.feedback.concat(feedback)};

//         default:
//             return state;
//     }
// };