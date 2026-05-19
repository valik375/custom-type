type FormDataValue =
  | string
  | number
  | boolean
  | File
  | Blob
  | Date
  | null
  | undefined
  | FormDataValue[]
  | { [key: string]: FormDataValue };

export function toFormData(
  value: FormDataValue,
  formData: FormData = new FormData(),
  parentKey?: string
): FormData {
  if (value === null || value === undefined) {
    return formData;
  }

  if (value instanceof Date) {
    formData.append(parentKey!, value.toISOString());
    return formData;
  }

  if (value instanceof Blob) {
    formData.append(parentKey!, value);
    return formData;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      toFormData(
        item,
        formData,
        `${parentKey}[${index}]`
      );
    });
    return formData;
  }

  if (typeof value === "object") {
    Object.entries(value).forEach(([key, nestedValue]) => {
      const formKey = parentKey
        ? `${parentKey}.${key}`
        : key;

      toFormData(
        nestedValue,
        formData,
        formKey
      );
    });
    return formData;
  }

  formData.append(parentKey!, String(value));

  return formData;
}