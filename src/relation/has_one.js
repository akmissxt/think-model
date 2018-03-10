const BaseRelation = require('./base.js');

/**
 * has one relation
 */
module.exports = class HasOneRelation extends BaseRelation {
  /**
   * relation on select or find
   */
  async getRelationData() {
    const where = this.parseRelationWhere();
    if (where === false) return this.data;
    const mapData = await this.options.model.where(where).select();
    return this.parseRelationData(mapData);
  }

  /**
   * relation on add, update, delete
   */
  async setRelationData(type) {
    const {model} = this.options;

    const data = this.data[this.options.name];
    switch (type) {
      case 'ADD':
        data[this.options.fKey] = this.data[this.options.key];
        return model.add(data);
      case 'UPDATE':
        return model.where({
          [this.options.fKey]: this.data[this.options.key]
        }).update(data);
      case 'DELETE':
        return model.where({
          [this.options.fKey]: this.data[this.options.key]
        }).delete();
    }
  }
};
