export interface PlanningTimeType { hour: number; min: number }
export interface PlanningPartType { start: PlanningTimeType; end: PlanningTimeType; targets: string[]; subjects: string[]; otherHelpers: string[] }
export interface PlanningType { lundi: PlanningPartType[]; mardi: PlanningPartType[]; mercredi: PlanningPartType[]; jeudi: PlanningPartType[]; vendredi: PlanningPartType[]; samedi: PlanningPartType[]; dimanche: PlanningPartType[] }
