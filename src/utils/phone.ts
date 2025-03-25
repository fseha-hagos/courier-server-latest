import { parsePhoneNumber, formatIncompletePhoneNumber } from 'libphonenumber-js';

/**
 * Formats a phone number for display (e.g., +251 99 469 7123)
 * @param phoneNumber The phone number to format
 * @returns Formatted phone number string
 */
export const formatPhoneNumberForDisplay = (phoneNumber: string): string => {
  try {
    const parsed = parsePhoneNumber(phoneNumber);
    return parsed.formatInternational();
  } catch (error) {
    return phoneNumber;
  }
};

/**
 * Formats a phone number for storage in E.164 format (e.g., +251994697123)
 * @param phoneNumber The phone number to format
 * @returns E.164 formatted phone number string without spaces
 */
export const formatPhoneNumberForStorage = (phoneNumber: string): string => {
  try {
    // First remove all spaces and non-digit characters except +
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    const parsed = parsePhoneNumber(cleaned);
    
    if (!parsed.isValid()) {
      throw new Error('Invalid phone number');
    }
    
    // Format to E.164 and ensure no spaces
    return parsed.format('E.164').replace(/\s+/g, '');
  } catch (error) {
    // If parsing fails, just clean the input as best we can
    return phoneNumber.replace(/\s+/g, '');
  }
};

/**
 * Validates a phone number
 * @param phoneNumber The phone number to validate
 * @returns boolean indicating if the phone number is valid
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  try {
    const parsed = parsePhoneNumber(phoneNumber);
    return parsed.isValid();
  } catch (error) {
    return false;
  }
}; 