import { TimelineKeyframeShape } from '../enums/timelineKeyframeShape';
import type { TimelineKeyframe } from '../models/timelineKeyframe';
import type { TimelineGroupViewModel } from './timelineGroupViewModel';
import type { TimelineRowViewModel } from './timelineRowViewModel';
/**
 * Timeline calculated view model.
 */
export interface TimelineKeyframeViewModel {
    /**
     * Size of the keyframe.
     */
    size: DOMRect;
    shape: TimelineKeyframeShape;
    /**
     * Related keyframe model.
     */
    model: TimelineKeyframe;
    /**
     * Related calculated parent row view model.
     */
    rowViewModel: TimelineRowViewModel;
    /**
     * Related calculated parent group view model.
     */
    groupViewModel: TimelineGroupViewModel;
}
