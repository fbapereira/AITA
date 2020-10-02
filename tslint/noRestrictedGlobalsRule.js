'use strict';

const ts = require('typescript');
const tsUtil = require('tsutils');
const Lint = require('tslint');

exports.Rule = class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new NoRestrictedGlobals(sourceFile, this.ruleName, this.ruleArguments));
    }
}

class NoRestrictedGlobals extends Lint.AbstractWalker {
    walk(sourceFile) {
        const cb = (node) => {
            // foo.bar || foo['bar']
            if (tsUtil.isPropertyAccessExpression(node) || tsUtil.isElementAccessExpression(node)) {
                const expression = node.expression;
                if (tsUtil.isIdentifier(expression) && this.options.includes(expression.text)) {
                    this.addFailureAtNode(expression, `Unexpected use of '${expression.text}'.`);
                }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    }
}