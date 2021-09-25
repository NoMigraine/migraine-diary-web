import React, { useEffect, useState } from 'react'
import usePrevious from '@/hook/StateWithPrevious'
import {notesService} from '@/service/index'
import './history.scss'
import moment, { Moment } from 'moment';
import classNames from 'classnames'
import { WeekDayLevel, WeekDay, NoteProf } from './History.d'

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]

const WeekDayCell: React.FC<WeekDay> = ({date, level, hasRecord = true, ...otherProps}) => {
    return <div className={classNames("week-day-cell", {
        "day-current": level === WeekDayLevel.CURRENT,
        "day-side": level === WeekDayLevel.DAY_SIDE,
        "day-normal": level === WeekDayLevel.DAY_NORMAL
    }, {
        "day-invalid": !hasRecord
    })} {...otherProps}>
        <span>{date.getMonth() + 1} / {date.getDate()}</span>
        <span>{WEEKDAYS[date.getDay()]}</span>
    </div>
}

const Note: React.FC<{noteSet: Array<NoteProf>}> = ({noteSet = []}) => {
    if(noteSet.length > 0)
        return <div className="note-container"></div>
    else return null;
}

const HistoryPage: React.FC = () => {
    let [refresh, setRefresh] = useState(false);
    let [thisMoment, setThisMoment] = useState(moment());
    let [thisWeek, setThisWeek] = useState(null);
    useEffect(() => {
        if (!thisWeek || thisWeek.every(wd => !wd.date.isSame(thisMoment))) {
            setThisWeek(new Array(7).fill(0).map((d, i) => ({date:moment(thisMoment).days(i + 1), notes: [], noteTntry: null})))
        }
    }, [thisMoment]);

    const fetchNotes = () => {
        notesService.getNotes().then(res => {
            res.data.forEach(d => {
                let noteProf = {
                    time: moment(d.create_time),
                    content: d.content,
                    level: d.level
                }
                thisWeek[(noteProf.time.day() || 7) - 1].notes.push(noteProf);
            })
            thisWeek.forEach(wd => {
                wd.noteEntry = <Note noteSet={wd.notes} key={wd.date.toDate()}/>
            })
            setRefresh(!refresh);
        })
    }
    useEffect(() => {
        if (thisWeek)
            fetchNotes();
    }, [thisWeek])

    const switchDate: (targetDay: Moment) => void = targetDay => {
        setThisMoment(targetDay);
    }
    const getLevel: (certainDay: Moment) => WeekDayLevel = certainDay => {
        if (thisMoment.isSame(certainDay)) {
            return WeekDayLevel.CURRENT;
        } else if (Math.abs((thisMoment.day() || 7) - (certainDay.day() || 7)) === 1) {
            return WeekDayLevel.DAY_SIDE;
        } else
            return WeekDayLevel.DAY_NORMAL;
    }
    return (
        <div className="history-page">
            <div className="week-calendar">
                {thisWeek && thisWeek.map(wd => <WeekDayCell date={wd.date.toDate() as Date} key={wd.date.toDate().getTime()} level={getLevel(wd.date)} hasRecord={wd.notes.length > 0} onClick={() => wd.notes.length > 0 && switchDate(wd.date)}/>)}
            </div>
            <div className="week-notes">
                {thisWeek && thisWeek.map(wd => wd.noteEntry)}
            </div>
        </div>
    );
}

export default HistoryPage;