import type { TimelineKeyframe } from '../models/timelineKeyframe';
import { TimelineElementType } from '../enums/timelineElementType';
import type { TimelineRow } from '../models/timelineRow';
import type { TimelineGroup } from '../models/timelineGroup';
/**
 * Timeline clickable element.
 */
export interface TimelineElement {
    type: TimelineElementType;
    /**
     * Timeline value,
     */
    val: number;
    /**
     * Related keyframe model.
     */
    keyframe?: TimelineKeyframe;
    /**
     * Related row model.
     */
    row?: TimelineRow;
    /**
     * Current group.
     */
    group?: string | TimelineGroup;
    /**
     * List of the selected, grouped, row keyframes.
     */
    keyframes?: TimelineKeyframe[];
}
