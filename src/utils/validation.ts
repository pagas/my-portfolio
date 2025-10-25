export interface ValidationError {
  field: string;
  message: string;
}

export function validateBlogPost(data: {
  title: string;
  description: string;
  content: string;
  tags?: string[];
}): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.title.trim()) {
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (data.title.length > 100) {
    errors.push({ field: 'title', message: 'Title must be less than 100 characters' });
  }

  if (!data.description.trim()) {
    errors.push({ field: 'description', message: 'Description is required' });
  } else if (data.description.length > 300) {
    errors.push({ field: 'description', message: 'Description must be less than 300 characters' });
  }

  if (!data.content.trim()) {
    errors.push({ field: 'content', message: 'Content is required' });
  }

  if ((data.tags?.length ?? 0) > 10) {
    errors.push({ field: 'tags', message: 'Maximum 10 tags allowed' });
  }

  return errors;
}

export function getFieldError(errors: ValidationError[], field: string): string | undefined {
  return errors.find(error => error.field === field)?.message;
}
