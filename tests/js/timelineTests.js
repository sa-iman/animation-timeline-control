"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var animation_timeline_1 = require("./../lib/animation-timeline");
describe('Timeline', function () {
    describe('_findDraggable', function () {
        it('Keyframe should be selected', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Group,
                    val: 5,
                },
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 5,
                },
            ];
            var element = timeline._findDraggable(elements, 5);
            if (!element) {
                throw new Error('element cannot be empty');
            }
            chai.expect(element.type).equal(animation_timeline_1.TimelineElementType.Keyframe, animation_timeline_1.TimelineElementType.Keyframe + ' should be selected');
        });
        it('Timeline should be selected', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Timeline,
                    val: 5,
                },
                {
                    type: animation_timeline_1.TimelineElementType.Group,
                    val: 5,
                },
            ];
            var element = timeline._findDraggable(elements, 5);
            if (!element) {
                throw new Error('element cannot be empty');
            }
            chai.expect(element.type).equal(animation_timeline_1.TimelineElementType.Timeline, animation_timeline_1.TimelineElementType.Timeline + ' should be selected');
        });
        it('Timeline should taken first', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Timeline,
                    val: 5,
                },
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 4,
                },
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 5,
                },
                {
                    type: animation_timeline_1.TimelineElementType.Group,
                    val: 5,
                },
            ];
            var element = timeline._findDraggable(elements, 5);
            if (!element) {
                throw new Error('element cannot be empty');
            }
            chai.expect(element.type).equal(animation_timeline_1.TimelineElementType.Timeline, animation_timeline_1.TimelineElementType.Timeline + ' should be selected');
            // Keyframe with value 5 should be selected
            chai.expect(element.val).equal(5);
        });
        it('Group should be selected', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Group,
                    val: 5,
                },
            ];
            var element = timeline._findDraggable(elements, 5);
            if (!element) {
                throw new Error('element cannot be empty');
            }
            chai.expect(element.type).equal(animation_timeline_1.TimelineElementType.Group, animation_timeline_1.TimelineElementType.Group + ' should be selected');
        });
        it('closest keyframe should be returned', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 0,
                },
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 4,
                },
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 9,
                },
            ];
            var element = timeline._findDraggable(elements, 5);
            chai.expect(element.val).equal(elements[1].val);
        });
        it('Keyframes are not draggable by global settings', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 4,
                },
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 5,
                },
                {
                    type: animation_timeline_1.TimelineElementType.Group,
                    val: 5,
                },
            ];
            // Apply global options::
            timeline._options = {
                rowsStyle: {
                    keyframesStyle: {
                        draggable: false,
                    },
                },
            };
            var element = timeline._findDraggable(elements, 5);
            chai.expect(element.type).equal(animation_timeline_1.TimelineElementType.Group, 'Group should be selected');
        });
        it('Keyframes are not draggable by row settings', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 4,
                    row: {
                        keyframesStyle: {
                            draggable: false,
                        },
                    },
                },
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 5,
                    row: {
                        keyframesStyle: {
                            draggable: true,
                        },
                    },
                },
            ];
            // Apply global options::
            var element = timeline._findDraggable(elements, 4);
            // Keyframe with value 5 should be selected as draggable
            chai.expect(element.val).equal(5);
        });
        it('Keyframes are draggable', function () {
            var timeline = new animation_timeline_1.Timeline();
            var elements = [
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 4,
                    keyframe: {
                        val: 0,
                    },
                    row: {
                        keyframesStyle: {
                            draggable: false,
                        },
                    },
                },
                {
                    type: animation_timeline_1.TimelineElementType.Keyframe,
                    val: 5,
                    keyframe: {
                        draggable: true,
                    },
                    row: {
                        keyframesStyle: {
                            keyframesStyle: {},
                        },
                    },
                },
            ];
            // Apply global options::
            var element = timeline._findDraggable(elements, 4);
            // Keyframe with value 5 should be selected as draggable
            chai.expect(element.val).equal(5);
        });
    });
    describe('select', function () {
        var model = {
            rows: [
                { val: 0, keyframes: [{ val: 0 }, { val: 0 }] },
                { val: 0, keyframes: [{ val: 0 }, { val: 0 }, { val: 0 }] },
                { val: 0, keyframes: [{ val: 0 }, { val: 0 }] },
                { val: 0, keyframes: [{ val: 0 }] },
            ],
        };
        it('Select all', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            var element = timeline.selectAllKeyframes();
            chai.expect(element.selectionChanged).equal(true);
            var changed = 0;
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    chai.expect(keyframe.selected).equal(true);
                    changed++;
                });
            });
            chai.expect(element.selected.length).equal(changed);
        });
        it('Select all selectable', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            var element = timeline.getAllKeyframes();
            var changed = 0;
            var selectable = 0;
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    keyframe.selected = false;
                    keyframe.selectable = changed % 2 === 0;
                    if (keyframe.selectable) {
                        selectable++;
                    }
                    changed++;
                });
            });
            var selectionResults = timeline.select(element);
            chai.expect(selectionResults.changed.length).equal(selectable);
            chai.expect(selectionResults.selected.length).equal(selectable);
        });
        it('Deselect all', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    keyframe.selectable = true;
                    keyframe.selected = true;
                });
            });
            // deselect all
            var element = timeline.deselectAll();
            chai.expect(element.selectionChanged).equal(true);
            chai.expect(element.selected.length).equal(0);
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    chai.expect(keyframe.selected).equal(false);
                });
            });
        });
        it('Select one and deselect other all', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            var expectedChanged = 0;
            // Select all
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    keyframe.selectable = true;
                    keyframe.selected = true;
                    expectedChanged++;
                });
            });
            // select one will deselect other
            var toSelect = model.rows[1].keyframes[0];
            var element = timeline.select(toSelect);
            chai.expect(element.selectionChanged).equal(true);
            chai.expect(element.selected.length).equal(1);
            chai.expect(element.changed.length).equal(expectedChanged - 1);
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    if (toSelect == keyframe) {
                        chai.expect(keyframe.selected).equal(true);
                    }
                    else {
                        chai.expect(keyframe.selected).equal(false);
                    }
                });
            });
        });
        it('Revert selection (Toggle)', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            var totalKeyframes = 0;
            // Select all
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    keyframe.selectable = true;
                    keyframe.selected = true;
                    totalKeyframes++;
                });
            });
            // toggle selection
            var toSelect = model.rows[1].keyframes[0];
            // item is selected, should be reverted
            var element = timeline.select(toSelect, animation_timeline_1.TimelineSelectionMode.Revert);
            chai.expect(element.selectionChanged).equal(true);
            chai.expect(element.selected.length).equal(totalKeyframes - 1);
            chai.expect(element.changed.length).equal(1);
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    if (toSelect == keyframe) {
                        chai.expect(keyframe.selected).equal(false);
                    }
                    else {
                        chai.expect(keyframe.selected).equal(true);
                    }
                });
            });
        });
        it('Select full row', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            // Deselect all
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    keyframe.selectable = true;
                    keyframe.selected = false;
                });
            });
            // select one will deselect other
            var rowToSelect = model.rows[1];
            var element = timeline.select(rowToSelect.keyframes);
            chai.expect(element.selectionChanged).equal(true);
            chai.expect(element.selected.length).equal(rowToSelect.keyframes.length);
            chai.expect(element.changed.length).equal(3);
            model.rows.forEach(function (row) {
                if (rowToSelect === row) {
                    rowToSelect.keyframes.forEach(function (keyframe) {
                        chai.expect(keyframe.selected).equal(true);
                    });
                }
                else {
                    row.keyframes.forEach(function (keyframe) {
                        chai.expect(keyframe.selected).equal(false);
                    });
                }
            });
        });
        it('Append select', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._model = model;
            // Deselect all
            model.rows.forEach(function (row) {
                row.keyframes.forEach(function (keyframe) {
                    keyframe.selected = false;
                });
            });
            // select one row (array of the keyframes)
            var rowToSelect = model.rows[1];
            var results = timeline.select(rowToSelect.keyframes);
            chai.expect(results.selectionChanged).equal(true);
            chai.expect(results.selected.length).equal(rowToSelect.keyframes.length);
            chai.expect(results.changed.length).equal(rowToSelect.keyframes.length);
            // (array of the keyframes)
            var rowToSelect2 = model.rows[2];
            results = timeline.select(rowToSelect2.keyframes, animation_timeline_1.TimelineSelectionMode.Append);
            chai.expect(results.selectionChanged).equal(true);
            chai.expect(results.selected.length).equal(rowToSelect.keyframes.length + rowToSelect2.keyframes.length);
            chai.expect(results.changed.length).equal(rowToSelect2.keyframes.length);
            model.rows.forEach(function (row) {
                if (rowToSelect === row || rowToSelect2 === row) {
                    rowToSelect.keyframes.forEach(function (keyframe) {
                        chai.expect(keyframe.selected).equal(true);
                    });
                }
                else {
                    row.keyframes.forEach(function (keyframe) {
                        chai.expect(keyframe.selected).equal(false);
                    });
                }
            });
        });
    });
    describe('Coordinates', function () {
        it('Coordinates', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                zoom: 1,
            });
            chai.expect(timeline.valToPx(0)).equal(0);
            chai.expect(timeline.valToPx(100)).equal(50);
            chai.expect(timeline.valToPx(200)).equal(100);
            chai.expect(timeline.pxToVal(0)).equal(0);
            chai.expect(timeline.pxToVal(50)).equal(100);
            chai.expect(timeline.pxToVal(100)).equal(200);
        });
        it('Coordinates. min is negative', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                min: -100,
                zoom: 1,
            });
            chai.expect(timeline.valToPx(-100)).equal(0);
            chai.expect(timeline.valToPx(-50)).equal(25);
            chai.expect(timeline.valToPx(0)).equal(50);
            chai.expect(timeline.valToPx(50)).equal(75);
            chai.expect(timeline.valToPx(100)).equal(100);
            chai.expect(timeline.pxToVal(0)).equal(-100);
            chai.expect(timeline.pxToVal(25)).equal(-50);
            chai.expect(timeline.pxToVal(50)).equal(0);
            chai.expect(timeline.pxToVal(75)).equal(50);
            chai.expect(timeline.pxToVal(100)).equal(100);
        });
        it('Zoom is respected', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                zoom: 1,
            });
            chai.expect(timeline.valToPx(0)).equal(0);
            chai.expect(timeline.valToPx(100)).equal(50);
            chai.expect(timeline.valToPx(200)).equal(100);
            timeline._setZoom(2);
            chai.expect(timeline.valToPx(0)).equal(0);
            chai.expect(timeline.valToPx(100)).equal(25);
            chai.expect(timeline.valToPx(200)).equal(50);
            chai.expect(timeline.pxToVal(0)).equal(0);
            chai.expect(timeline.pxToVal(25)).equal(100);
            chai.expect(timeline.pxToVal(50)).equal(200);
        });
    });
    describe('Snapping', function () {
        it('Snapping', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                snapStep: 25,
                zoom: 1,
            });
            chai.expect(timeline.snapVal(0)).equal(0);
            chai.expect(timeline.snapVal(10)).equal(0);
            chai.expect(timeline.snapVal(26)).equal(25);
            chai.expect(timeline.snapVal(48)).equal(50);
            chai.expect(timeline.snapVal(58)).equal(50);
        });
        it('Snapping. min is defined', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                snapStep: 25,
                min: 5,
                zoom: 1,
            });
            chai.expect(timeline.snapVal(0)).equal(5);
            chai.expect(timeline.snapVal(10)).equal(5);
            chai.expect(timeline.snapVal(26)).equal(30);
            chai.expect(timeline.snapVal(48)).equal(55);
            chai.expect(timeline.snapVal(58)).equal(55);
            // Don't overlap the limit.
            chai.expect(timeline.snapVal(-100)).equal(5);
        });
        it('Snapping. negative min is defined', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                snapStep: 25,
                min: -55,
                zoom: 1,
            });
            chai.expect(timeline.snapVal(0)).equal(-5);
            chai.expect(timeline.snapVal(10)).equal(-5);
            chai.expect(timeline.snapVal(26)).equal(20);
            chai.expect(timeline.snapVal(48)).equal(45);
            chai.expect(timeline.snapVal(58)).equal(45);
            chai.expect(timeline.snapVal(-1)).equal(-5);
            chai.expect(timeline.snapVal(-10)).equal(-5);
            chai.expect(timeline.snapVal(-26)).equal(-30);
            chai.expect(timeline.snapVal(-48)).equal(-55);
            chai.expect(timeline.snapVal(-58)).equal(-55);
            // Don't overlap the limit.
            chai.expect(timeline.snapVal(-100)).equal(-55);
        });
        it('Snapping. negative min (-25) is defined', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._setOptions({
                stepVal: 100,
                stepPx: 50,
                snapStep: 25,
                min: -25,
                zoom: 1,
            });
            chai.expect(timeline.snapVal(-1)).equal(0);
            chai.expect(timeline.snapVal(-10)).equal(0);
            chai.expect(timeline.snapVal(10)).equal(0);
            chai.expect(timeline.snapVal(26)).equal(25);
            chai.expect(timeline.snapVal(50)).equal(50);
            chai.expect(timeline.snapVal(-58)).equal(-25);
        });
    });
    describe('Move Keyframes', function () {
        it('move left', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._options = null;
            var item1 = 25;
            var item2 = 50;
            var model = {
                rows: [{ val: 0, keyframes: [{ val: item1 }, { val: item2 }] }],
            };
            timeline._model = model;
            var move = -50;
            var movedOffset = timeline._moveElements(move, [
                {
                    keyframe: model.rows[0].keyframes[1],
                    row: model.rows[0],
                },
                {
                    keyframe: model.rows[0].keyframes[0],
                    row: model.rows[0],
                },
            ]);
            chai.expect(movedOffset).equal(move);
            chai.expect(model.rows[0].keyframes[0].val).equal(item1 + move);
            chai.expect(model.rows[0].keyframes[1].val).equal(item2 + move);
        });
        it('move right', function () {
            var timeline = new animation_timeline_1.Timeline();
            var item1 = 25;
            var item2 = 50;
            var model = {
                rows: [{ val: 0, keyframes: [{ val: item1 }, { val: item2 }] }],
            };
            timeline._model = model;
            var move = 100;
            var movedOffset = timeline._moveElements(move, [
                {
                    keyframe: model.rows[0].keyframes[1],
                    row: model.rows[0],
                },
                {
                    keyframe: model.rows[0].keyframes[0],
                    row: model.rows[0],
                },
            ]);
            chai.expect(movedOffset).equal(move);
            chai.expect(model.rows[0].keyframes[0].val).equal(item1 + move);
            chai.expect(model.rows[0].keyframes[1].val).equal(item2 + move);
        });
        it('move left limited by min', function () {
            var timeline = new animation_timeline_1.Timeline();
            var item1 = 25;
            var item2 = 50;
            timeline._options = { min: 0, max: 75 };
            var move = -50;
            var elementsToMove = [
                {
                    keyframe: { val: item1 },
                },
                {
                    keyframe: { val: item2 },
                },
            ];
            var movedOffset = timeline._moveElements(move, elementsToMove);
            chai.expect(movedOffset).equal(move / 2);
            chai.expect(elementsToMove[0].keyframe.val).equal(0);
            chai.expect(elementsToMove[1].keyframe.val).equal(25);
        });
        it('move right limited by max', function () {
            var timeline = new animation_timeline_1.Timeline();
            var item1 = 25;
            var item2 = 50;
            timeline._options = { min: 0, max: 100 };
            var move = 100;
            var elementsToMove = [
                {
                    keyframe: { val: item1 },
                },
                {
                    keyframe: { val: item2 },
                },
            ];
            var movedOffset = timeline._moveElements(move, elementsToMove);
            chai.expect(movedOffset).equal(move / 2);
            chai.expect(elementsToMove[0].keyframe.val).equal(item1 + 50);
            chai.expect(elementsToMove[1].keyframe.val).equal(item2 + 50);
        });
        it('move right limited by max negative', function () {
            var timeline = new animation_timeline_1.Timeline();
            var item1 = -125;
            var item2 = -150;
            timeline._options = { min: -200, max: -100 };
            var move = 100;
            var elementsToMove = [
                {
                    keyframe: { val: item1 },
                },
                {
                    keyframe: { val: item2 },
                },
            ];
            var movedOffset = timeline._moveElements(move, elementsToMove);
            chai.expect(movedOffset).equal(25);
            chai.expect(elementsToMove[0].keyframe.val).equal(item1 + 25);
            chai.expect(elementsToMove[1].keyframe.val).equal(item2 + 25);
        });
        it('move right limited by max negative when other row out of the bounds', function () {
            var timeline = new animation_timeline_1.Timeline();
            timeline._options = { min: 0, max: 600 };
            var move = 200;
            var row = { max: 500 };
            var row2 = {};
            var elementsToMove = [
                {
                    keyframe: { val: 100 },
                    row: row,
                },
                {
                    keyframe: { val: 400 },
                    row: row,
                },
                {
                    keyframe: { val: 200 },
                    row: row2,
                },
                {
                    keyframe: { val: 300 },
                    row: row2,
                },
            ];
            var movedOffset = timeline._moveElements(move, elementsToMove);
            var moved = move / 2;
            chai.expect(movedOffset).equal(moved);
            chai.expect(elementsToMove[0].keyframe.val).equal(100 + moved);
            chai.expect(elementsToMove[1].keyframe.val).equal(400 + moved);
            chai.expect(elementsToMove[2].keyframe.val).equal(200 + moved);
            chai.expect(elementsToMove[3].keyframe.val).equal(300 + moved);
        });
        it('move left limited by min negative', function () {
            var timeline = new animation_timeline_1.Timeline();
            var item1 = -125;
            var item2 = -150;
            timeline._options = { min: -200, max: -100 };
            var move = -100;
            var elementsToMove = [
                {
                    keyframe: { val: item1 },
                },
                {
                    keyframe: { val: item2 },
                },
            ];
            var movedOffset = timeline._moveElements(move, elementsToMove);
            chai.expect(movedOffset).equal(move / 2);
            chai.expect(elementsToMove[0].keyframe.val).equal(item1 - 50);
            chai.expect(elementsToMove[1].keyframe.val).equal(item2 - 50);
        });
        it('move left only one keyframe is limited', function () {
            var timeline = new animation_timeline_1.Timeline();
            var move = 100;
            var row = { min: 0, max: 100 };
            var elementsToMove = [
                {
                    keyframe: { val: 25 },
                    row: row,
                },
                {
                    keyframe: { val: 50 },
                    row: row,
                },
            ];
            var movedOffset = timeline._moveElements(move, elementsToMove);
            chai.expect(movedOffset).equal(move / 2);
            chai.expect(elementsToMove[0].keyframe.val).equal(25 + 50);
            chai.expect(elementsToMove[1].keyframe.val).equal(50 + 50);
        });
    });
});
//# sourceMappingURL=timelineTests.js.map