export const calculateWidth = (userCount: number): string => {
  // Determines the appropriate width based on the user count

  if (userCount === 1) {
    // If user count is 1, use full screen width
    return 'w-full';
  }

  if (userCount <= 4) {
    // If user count is between 2 and 4, use half screen width on medium-sized devices
    return 'w-full md:w-1/2';
  }

  if (userCount <= 6) {
    // If user count is between 5 and 6, use one-third screen width on medium-sized devices
    return 'w-full md:w-1/3';
  }

  if (userCount <= 8) {
    // If user count is between 7 and 8, use one-fourth screen width on medium-sized devices
    return 'w-full md:w-1/4';
  }

  // If user count is greater than 8, use one-fourth screen width and one-third screen height
  return 'w-full md:w-1/4 h-1/3';
};
