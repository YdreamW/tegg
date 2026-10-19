export class StringUtil {
  static trim(str: string): string {
    return str.replace(/^\s+|\s+$/g, '');
  }

  static isEmpty(str: string | null | undefined): boolean {
    if (str == null) {
      return true;
    }
    return str.length === 0;
  }

  static capitalize(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }
}
