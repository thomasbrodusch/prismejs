/** PrismeJS
* Presentation and transformation layer for complex/dirty API's data output.
*
* @author Thomas Brodusch
* @version  1.0.0
 */

export default class Prismejs {
    constructor(type = 'json') {
        this.availableReturnTypes = ['json'];
        this.setReturnType(type);
        this.grammar = {
            regex: /\.|\:|(\[.*\])/g,
            regexObjectSeparator: /\./g,
            regexPropCheck: /(.*?):(.*)(\[(.*)\])?/g,
            objectSeperator: '.', // data['toto']  > data.toto
            propCheck: ':', // data['toto'] = 'tata' > data.toto:tata
            endValue: /\[(.*?)\]/g // data['toto'].value  > data.toto[tata]
        };
    }

    setReturnType(type) {
        try {
            if (this.availableReturnTypes.includes(type)) {
                this.returnType = type;
            } else {
                throw new Error('InvalidReturnType');
            }
        } catch (err) {
            console.warn(
                `PrismeJS [ ${err.name}: ${err.message} ] — "${type}"" is an invalid return type. Please set an available return type.`
            );
            console.log(
                `PrismeJS — Available return types : ${this
                    .availableReturnTypes} `
            );
        }
    }

    format(source, modelObject) {
        let formattedData;
        if (this.returnType === 'json') {
            formattedData = this.formatJSON(source, modelObject);
        }
        return formattedData;
    }

    formatJSON(source, model) {
        let formattedJSON = {};
        if (!(source instanceof Array)) {
            source = [source];
        }
        formattedJSON = source.map(elem => {
            let formattedEntity = {};
            return this.formatJSONObject(elem, model);
        });
        return formattedJSON;
    }

    formatJSONObject(sourceElem, object) {
        let formattedEntity = {};

        for (var prop in object) {
            let formattedProp = this.formatJSONProp(sourceElem, object[prop]);
            if (formattedProp !== null) {
                formattedEntity[prop] = formattedProp;
            }
        }

        return formattedEntity;
    }

    formatJSONProp(sourceElem, prop) {
        let formattedProp = null;

        if (typeof prop === 'string') {
            formattedProp = sourceElem[prop];

            // Check if current string prop contain Prisme grammar.
            if (prop.match(this.grammar.regex)) {
                formattedProp = this.tracePath(
                    sourceElem,
                    prop,
                    prop.split(this.grammar.regexObjectSeparator)
                );
            }
        }

        if (typeof prop === 'object') {
            formattedProp = this.formatJSONObject(sourceElem, prop);
        }

        return formattedProp;
    }

    tracePath(sourceElem, prop, checkpoints) {
        let tracedPath = [];
        let finalValue = false;

        checkpoints.forEach(pathItem => {
            if (pathItem.match(this.grammar.propCheck)) {
                let extractPath = pathItem.split(this.grammar.propCheck)[0];
                tracedPath.push(extractPath);
            } else {
                tracedPath.push(pathItem);
            }
        });

        checkpoints.map(pathItem => {
            // Check if a prop is equal to something in particular.
            if (pathItem.match(this.grammar.regexPropCheck)) {
                // Build path to var.
                let finalVar = pathItem.split(this.grammar.propCheck);
                let m = this.grammar.endValue.exec(finalVar[1]);
                let endValue;

                if (m !== null) {
                    endValue = m[1];
                }

                let buildSource = sourceElem;
                let found = false;

                tracedPath.some(item => {
                    if (item === finalVar[0]) {
                        let i = 0;
                        while (i < buildSource.length || found) {
                            if (
                                buildSource[i][item] ===
                                finalVar[1].replace(this.grammar.endValue, '')
                            ) {
                                if (endValue) {
                                    return (finalValue =
                                        buildSource[i][endValue]);
                                } else {
                                    return (finalValue = buildSource[i]);
                                }
                            }
                            i++;
                        }
                    }

                    buildSource = buildSource[item];
                });
            } else if (pathItem.match(this.grammar.endValue)) {
                let m = this.grammar.endValue.exec(pathItem);
                finalValue = sourceElem[pathItem.replace(m[0], '')][m[1]];
            }
        });
        return finalValue;
    }
}
