export default interface Gym{
    id: number,
    title: string,
    street?: string,
    region?: string,
    city_name?: string,
    state_name?: string,
    uf?: string,
    content?: string,
    opened?: boolean,
    mask: string,
    towel?: string,
    fountain?: string,
    locker_room?: string,
    schedules?: ScheduleItem[]
}

interface ScheduleItem{
    weekdays: string,
    hour: string
}