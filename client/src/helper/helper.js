export const capitalizeName = (name) => {
    const cap = name
      .split(" ")
      .map((n) => n[0].toUpperCase() + n.substring(1))
      .join(" ");
    return cap;
  };


  export const sortAlpabhetically = (data) => {
    return data.sort((a, b) => a.localeCompare(b));
  };