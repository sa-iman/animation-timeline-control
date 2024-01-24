import { TimelineSelectionEventSource } from '../../enums/timelineSelectionEventSource';
import type { TimelineKeyframe } from '../../models/timelineKeyframe';

export class TimelineSelectedEvent {
  /**
   * Selected Keyframes list.
   */
  selected: TimelineKeyframe[] = [];
  /**
   * Changed selection.
   */
  changed: TimelineKeyframe[] = [];
  /**
   * Selection mode.
   */
  mode: TimelineSelectionEventSource = TimelineSelectionEventSource.Keyframes;
}
