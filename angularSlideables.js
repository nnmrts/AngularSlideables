angular.module('angularSlideables', [])
.directive('slideable', function () {
            return {
                restrict: 'C',

                // added new attribute to scope:
                scope: {
                    slExpandedModel: '='
                },

                compile: function (element, attr) {
                    // wrap tag
                    var contents = element.html();
                    element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

                    return function postLink(scope, element, attrs) {
                        // default properties
                        attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                        attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                        element.css({
                            'overflow': 'hidden',
                            'height': '0px',
                            'transitionProperty': 'height',
                            'transitionDuration': attrs.duration,
                            'transitionTimingFunction': attrs.easing
                        });

                        var target, content;

                        // added a watch to the new attribute and expanded/collapsed according to its value:
                        scope.$watch('slExpandedModel', function (expanded) {
                            if (angular.isUndefined(expanded)) {
                                expanded = false;
                            }

                            if (!target) target = element[0];
                            if (!content) content = target.querySelector('.slideable_content');

                            if (expanded) {
                                content.style.border = '1px solid rgba(0,0,0,0)';
                                var y = content.clientHeight;
                                content.style.border = 0;
                                target.style.height = y + 'px';
                            } else {
                                target.style.height = '0px';
                            }
                        }, true);
                    };
                }
            };
        })
