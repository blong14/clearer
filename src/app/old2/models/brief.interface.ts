interface Goal {
  text: string
}

export interface Brief {
  goals: Array<Goal>,
  constraints: Array<Goal>
}
