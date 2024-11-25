- background animate
  animated: {
  type: Boolean
  default: false
  }

- @description how many fake items to render to the DOM
  count: {
  type: Number
  default: 1
  }

- @description whether showing the real DOM
  rows: {
  type: Number
  default: 3
  }

- @description numbers of the row, only useful when no template slot were given
  loading: {
  type: Boolean
  default: true
  }

- @description rendering delay in milliseconds
  throttle: {
  type: Number
  }
