export default class DistanceUtil {
  /**
   * - If already an array returns it
   * @param {Vec3i|Number[3]} vec 
   * @returns {Number[3]}
   */
  static vec3iToArray(vec) {
    if (vec instanceof Array) return vec
    return [vec.x, vec.y, vec.z]
  }

  static getDistance(array1, array2) {
    return Math.abs(Math.hypot(array1[0] - array2[0], array1[1] - array2[1], array1[2] - array2[2]))
  }

  /**
   * 
   * @param {Number[3]} point 
   * @param  {Object[]} objs - {name: String, vec: Number[3]}
   * @returns {Object}
   */
  static getClosest(point, objs) {
    objs.sort((a, b) => this.getDistance(point, a.pre.loc) - this.getDistance(point, b.pre.loc))
    return objs[0]
  }
}