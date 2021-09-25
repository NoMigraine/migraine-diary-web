import React from 'react'
export interface WeekDay extends React.HTMLAttributes<any> {
    date: Date;
    level: WeekDayLevel;
    hasRecord?: Boolean;
}

export enum WeekDayLevel {
    CURRENT = 1,
    DAY_SIDE = 2,
    DAY_NORMAL = 3
}


export interface NoteProf {
    time: Date,
    content: String,
    level: Number

}