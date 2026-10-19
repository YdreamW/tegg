export class NameUtil {
  static getClassName(constructor: Function) {
    if (constructor == null) {
      return '';
    }
    return constructor.name[0].toLowerCase() + constructor.name.substring(1);
  }

  static toLower(str: string) {
    return str.toLowerCase();
  }
}
