const { AbilityBuilder, Ability } = require("@casl/ability");

const defineAbilitiesFor = (role) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (!role) cannot("manage", "all");
  else
    switch (role) {
      case "Admin":
        can("manage", "all");
        break;
      case "Client":
        can("read", "Clients");
        can("update", "Clients");
        can("update", "Users");
        can("update", "files");
        can("delete", "files");
        can("read", "files");
        can("create", "files");
        cannot("delete", "Users");
        break;
      case "Role 1":
        can("update", "Clients");
        can("create", "Clients");
        can("update", "Users");
        can("read", "Clients");
        can("update", "files");
        can("create", "files");
        can("delete", "files");
        can("read", "files");
        break;
      case "Role 2":
        can("update", "Clients");
        can("create", "Clients");
        can("update", "Users");
        can("read", "Clients");
        can("update", "files");
        can("create", "files");
        can("delete", "files");
        can("read", "files");
        // can("update", "User", { type: "type1" }, ["name", "email"]);
        break;

      default:
        break;
    }
  return build();
};

module.exports = { defineAbilitiesFor };
