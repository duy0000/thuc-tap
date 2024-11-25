export const isTriggerType = (trigger, type) => {
  if (isArray(trigger)) {
    return trigger.includes(type)
  }
  return trigger === type
}

export const whenTrigger = (trigger, type, handler) => {
  return (e) => {
    isTriggerType(trigger, type) && handler(e)
  }
}
