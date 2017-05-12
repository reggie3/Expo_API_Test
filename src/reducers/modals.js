// REDUCER for modals portion of store

export default function modals(modals = {}, action) {

  switch (action.type) {

    case 'SHOW_MAIN_MENU':
      return Object.assign({}, modals, { showMainMenu: action.bool });
    /*** Generic error dialog */
    case 'SHOW_ERROR_DIALOG':
      debugger;
      let errorMessage = 'an error occurred';
      switch (action.message) {
        case 'username_exists':
          errorMessage = 'this username is already in use'
          break;
      }
      return Object.assign({}, modals, {
        showErrorDialog: Object.assign({}, modals.showErrorDialog,
          {
            open: true,
            message: errorMessage,
            title: action.title
          })
      });
    case 'CLOSE_ERROR_DIALOG':
      return Object.assign({}, modals, {
        showErrorDialog: Object.assign({}, modals.showErrorDialog,
          {
            open: false,
            message: "",
            title: ""
          })
      });

    /*** Generic success dialog */
    case 'SHOW_SUCCESS_DIALOG':
      console.log(action);
      let successMessage = 'congratulations!';

      return Object.assign({}, modals, {
        showSuccessDialog: Object.assign({}, modals.showSuccessDialog,
          {
            open: true,
            message: action.message,
            title: action.title
          })
      });
    case 'CLOSE_SUCCESS_DIALOG':
      return Object.assign({}, modals, {
        showSuccessDialog: Object.assign({}, modals.showSuccessDialog,
          {
            open: false,
            message: "",
            title: ""
          })
      });

    case 'SHOW_PENDING_DIALOG':
      return Object.assign({}, modals, {
        showPendingDialog: Object.assign({}, modals.showPendingDialog,
          {
            open: true,
            message: action.message,
          })
      });

    case 'CLOSE_PENDING_DIALOG':
      return Object.assign({}, modals, {
        showPendingDialog: Object.assign({}, modals.showPendingDialog,
          {
            open: false,
            message: "",
          })
      });

    default:
      return modals;
  }
}