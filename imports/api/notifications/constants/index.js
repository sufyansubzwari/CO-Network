const messages = (action, userName, entity, title) => {
  switch (action) {
    case "POST":
      return `The member ${userName} that you follow has create a new ${entity}. ${title}.`;
    case "UPDATE":
      return `The ${entity} that you are following have been updated. ${title}`;
    case "DELETE":
      return `The ${entity} that you are following have been deleted. ${title}`;
    case "FOLLOW":
      return `The member ${userName} is now following you.`;
    case "FOLLOW_ENTITY":
      return `The member ${userName} is now following your ${entity} ${title}.`;
    case "APPLY":
      return `The member ${userName} has applied for your ${entity} ${title}.`;
    case "SPONSOR":
      return `You have been selected as Sponsor by the user ${userName} for the ${entity} ${title}.`;
    case "SPEAKER":
      return `You have been selected as Speaker by the user ${userName} for the ${entity} ${title}.`;
    case "REPLY":
      return `You have been selected as Speaker by the user ${userName} for the ${entity} ${title}.`;
  }
};

export { messages };
