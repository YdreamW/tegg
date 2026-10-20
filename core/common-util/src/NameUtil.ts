export class NameUtil {
  static getClassName(constructor: Function) {
    return constructor.name[0].toLowerCase() + constructor.name.substring(1);
  }

  // Convert a camelCase string to kebab-case
  static toKebabCase(str: string): string {
    if (!str) return str;
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
  }
}
