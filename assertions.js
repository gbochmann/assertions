     function assert() {

        function AssertWrapper (subject) {
            this.subject = subject;
            this.isDefined = throwIfTrue(isUndefined.bind(this), 'Assertion failed: Subject is not defined.');
            this.isUndefined = throwIfFalse(isUndefined.bind(this), 'Assertion failed: Subject should be undefined.');
            this.isEmpty = throwIfFalse(isEmpty.bind(this), 'Assertion Failure! Subject is not empty.');
            this.isNotEmpty = throwIfTrue(isEmpty.bind(this), 'Assertion Failure! Subject is empty.');
            this.isSomething = throwIfFalse(isSomething.bind(this), 'Assertion Failure! Subject is null, empty or undef.');
            this.isNull = throwIfFalse(isNull.bind(this), 'Assertion Failure! Subject is not null.');
            this.isNotNull = throwIfTrue(isNull.bind(this), 'Assertion Failure! Subject is null.');
        }


        return function wrapSubject(subject) {
            return new AssertWrapper(subject);
        };

        ////////////

        function isNull() {
            return this.subject === null;
        }

        function isUndefined () {
            return this.subject === void 0;
        }

        function isEmpty() {
            return this.subject === '' || this.subject.length === 0;
        }

        function isString() {
            return typeof this.subject === 'string';
        }


        function isSomething() {
            return [isUndefined.call(this), isNull.call(this), isEmpty.call(this)].indexOf(false) === -1;
        }

        function throwIfFalse (conditionFn, message) {
            return function () {
                if (!conditionFn()) {
                    throw message || 'Assertion failed!';
                }

                return this;
            };
        }

        function throwIfTrue (conditionFn, message) {
            return function () {
                if (conditionFn()) {
                    throw message || 'Assertion failed!';
                }

                return this;
            };
        }

    }
