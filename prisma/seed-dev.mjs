import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ["error"] });

const ids = {
  user: "dev-user-apiculteur",
  organization: "dev-organization-rucher",
  membership: "dev-membership-owner",
  role: "dev-role-owner",
  apiaryHome: "dev-apiary-home",
  apiaryHill: "dev-apiary-hill",
  hiveOne: "dev-hive-001",
  hiveTwo: "dev-hive-002",
  colonyOne: "dev-colony-001",
  colonyTwo: "dev-colony-002",
  typeFrames: "dev-equipment-type-frames",
  typeSmoker: "dev-equipment-type-smoker",
  typeSuit: "dev-equipment-type-suit",
  stockFrames: "dev-equipment-stock-frames",
  itemSmoker: "dev-equipment-item-smoker",
  itemSuit: "dev-equipment-item-suit",
  eventFrames: "dev-equipment-event-frames",
  eventSmoker: "dev-equipment-event-smoker",
  eventSuit: "dev-equipment-event-suit",
};

const moduleDefinitions = [
  ["organizations", "Organisations", "CORE"],
  ["users_roles", "Utilisateurs et rôles", "CORE"],
  ["apiaries", "Ruchers", "BEEKEEPING"],
  ["hives", "Ruches", "BEEKEEPING"],
  ["colonies", "Colonies", "BEEKEEPING"],
  ["visits", "Visites", "BEEKEEPING"],
  ["tasks", "Tâches", "BEEKEEPING"],
  ["health", "Sanitaire", "BEEKEEPING"],
  ["varroa", "Varroa", "BEEKEEPING"],
  ["hornet", "Frelon", "BEEKEEPING"],
  ["knowledge", "Base de connaissance", "KNOWLEDGE"],
  ["contacts", "Contacts utiles", "CORE"],
  ["documents", "Documents", "DOCUMENTS"],
  ["harvests", "Récoltes simples", "BEEKEEPING"],
  ["equipment", "Matériel", "BEEKEEPING"],
];

const permissionDefinitions = [
  ["organization.manage", "Gérer l'organisation"],
  ["users.manage", "Gérer les utilisateurs"],
  ["roles.manage", "Gérer les rôles"],
  ["modules.manage", "Gérer les modules"],
  ["apiaries.read", "Lire les ruchers"],
  ["apiaries.write", "Modifier les ruchers"],
  ["hives.read", "Lire les ruches"],
  ["hives.write", "Modifier les ruches"],
  ["colonies.read", "Lire les colonies"],
  ["colonies.write", "Modifier les colonies"],
  ["visits.read", "Lire les visites"],
  ["visits.write", "Modifier les visites"],
  ["tasks.read", "Lire les tâches"],
  ["tasks.write", "Modifier les tâches"],
  ["health.read", "Lire le sanitaire"],
  ["health.write", "Modifier le sanitaire"],
  ["knowledge.read", "Lire la connaissance"],
  ["knowledge.write", "Modifier la connaissance"],
  ["documents.read", "Lire les documents"],
  ["documents.write", "Modifier les documents"],
  ["contacts.read", "Lire les contacts"],
  ["contacts.write", "Modifier les contacts"],
  ["harvests.read", "Lire les récoltes"],
  ["harvests.write", "Modifier les récoltes"],
  ["equipment.read", "Lire le matériel"],
  ["equipment.write", "Modifier le matériel"],
  ["equipment.manage", "Administrer le matériel"],
];

async function main() {
  const organization = await prisma.organization.upsert({
    where: { id: ids.organization },
    update: {
      name: "Rucher de développement",
      type: "Espace de démonstration",
      status: "ACTIVE",
    },
    create: {
      id: ids.organization,
      name: "Rucher de développement",
      type: "Espace de démonstration",
      status: "ACTIVE",
    },
  });

  const user = await prisma.user.upsert({
    where: { id: ids.user },
    update: {
      name: "Apiculteur de développement",
      email: "dev-user.example.invalid",
      status: "ACTIVE",
    },
    create: {
      id: ids.user,
      name: "Apiculteur de développement",
      email: "dev-user.example.invalid",
      status: "ACTIVE",
    },
  });

  const role = await prisma.role.upsert({
    where: {
      organizationId_code: {
        organizationId: organization.id,
        code: "owner",
      },
    },
    update: {
      name: "Propriétaire développement",
      description: "Rôle fictif pour les validations locales.",
    },
    create: {
      id: ids.role,
      organizationId: organization.id,
      code: "owner",
      name: "Propriétaire développement",
      description: "Rôle fictif pour les validations locales.",
    },
  });

  const membership = await prisma.membership.upsert({
    where: {
      organizationId_userId: {
        organizationId: organization.id,
        userId: user.id,
      },
    },
    update: {
      id: ids.membership,
      roleId: role.id,
      status: "ACTIVE",
      joinedAt: new Date("2026-01-01T00:00:00.000Z"),
    },
    create: {
      id: ids.membership,
      organizationId: organization.id,
      userId: user.id,
      roleId: role.id,
      status: "ACTIVE",
      joinedAt: new Date("2026-01-01T00:00:00.000Z"),
    },
  });

  const modules = await seedModules(organization.id);
  const permissions = await seedPermissions(role.id);

  await seedApiariesAndHives(organization.id);
  await seedEquipment(organization.id);

  console.log(
    `Seed développement OK: ${modules.length} modules, ${permissions.length} permissions, organisation ${organization.id}.`,
  );
  console.log(`Adhésion active: ${membership.id}.`);
}

async function seedModules(organizationId) {
  const modules = [];

  for (const [code, name, category] of moduleDefinitions) {
    const moduleDefinition = await prisma.moduleDefinition.upsert({
      where: { code },
      update: { name, category, isSystem: true },
      create: { code, name, category, isSystem: true },
    });

    await prisma.organizationModule.upsert({
      where: {
        organizationId_moduleId: {
          organizationId,
          moduleId: moduleDefinition.id,
        },
      },
      update: { status: "ENABLED" },
      create: {
        organizationId,
        moduleId: moduleDefinition.id,
        status: "ENABLED",
      },
    });

    await prisma.membershipModulePreference.upsert({
      where: {
        membershipId_moduleId: {
          membershipId: ids.membership,
          moduleId: moduleDefinition.id,
        },
      },
      update: { status: "ENABLED" },
      create: {
        membershipId: ids.membership,
        moduleId: moduleDefinition.id,
        status: "ENABLED",
      },
    });

    modules.push(moduleDefinition);
  }

  return modules;
}

async function seedPermissions(roleId) {
  const permissions = [];

  for (const [code, name] of permissionDefinitions) {
    const permission = await prisma.permission.upsert({
      where: { code },
      update: { name },
      create: { code, name },
    });

    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId,
        permissionId: permission.id,
      },
    });

    permissions.push(permission);
  }

  return permissions;
}

async function seedApiariesAndHives(organizationId) {
  await prisma.apiary.upsert({
    where: { id: ids.apiaryHome },
    update: {
      name: "Rucher école",
      locationDescription: "Emplacement fictif proche du local matériel",
      status: "ACTIVE",
    },
    create: {
      id: ids.apiaryHome,
      organizationId,
      name: "Rucher école",
      locationDescription: "Emplacement fictif proche du local matériel",
      status: "ACTIVE",
    },
  });

  await prisma.apiary.upsert({
    where: { id: ids.apiaryHill },
    update: {
      name: "Rucher des coteaux",
      locationDescription: "Site fictif de démonstration",
      status: "ACTIVE",
    },
    create: {
      id: ids.apiaryHill,
      organizationId,
      name: "Rucher des coteaux",
      locationDescription: "Site fictif de démonstration",
      status: "ACTIVE",
    },
  });

  await prisma.hive.upsert({
    where: {
      organizationId_fieldIdentifier: {
        organizationId,
        fieldIdentifier: "DEV-RU-001",
      },
    },
    update: {
      id: ids.hiveOne,
      apiaryId: ids.apiaryHome,
      hiveType: "Dadant 10 cadres",
      status: "ACTIVE",
    },
    create: {
      id: ids.hiveOne,
      organizationId,
      apiaryId: ids.apiaryHome,
      fieldIdentifier: "DEV-RU-001",
      hiveType: "Dadant 10 cadres",
      status: "ACTIVE",
    },
  });

  await prisma.hive.upsert({
    where: {
      organizationId_fieldIdentifier: {
        organizationId,
        fieldIdentifier: "DEV-RU-002",
      },
    },
    update: {
      id: ids.hiveTwo,
      apiaryId: ids.apiaryHill,
      hiveType: "Warré",
      status: "ACTIVE",
    },
    create: {
      id: ids.hiveTwo,
      organizationId,
      apiaryId: ids.apiaryHill,
      fieldIdentifier: "DEV-RU-002",
      hiveType: "Warré",
      status: "ACTIVE",
    },
  });

  await prisma.colony.upsert({
    where: { id: ids.colonyOne },
    update: {
      hiveId: ids.hiveOne,
      status: "ACTIVE",
      estimatedForce: 4,
    },
    create: {
      id: ids.colonyOne,
      organizationId,
      hiveId: ids.hiveOne,
      origin: "Essaim fictif de développement",
      queenKnown: false,
      status: "ACTIVE",
      estimatedForce: 4,
    },
  });

  await prisma.colony.upsert({
    where: { id: ids.colonyTwo },
    update: {
      hiveId: ids.hiveTwo,
      status: "WEAK",
      estimatedForce: 2,
    },
    create: {
      id: ids.colonyTwo,
      organizationId,
      hiveId: ids.hiveTwo,
      origin: "Division fictive de développement",
      queenKnown: true,
      queenYear: 2025,
      status: "WEAK",
      estimatedForce: 2,
    },
  });
}

async function seedEquipment(organizationId) {
  await prisma.equipmentType.upsert({
    where: {
      organizationId_name: {
        organizationId,
        name: "Cadres montés",
      },
    },
    update: {
      id: ids.typeFrames,
      category: "Consommables",
      trackingMode: "QUANTITY",
      defaultUnit: "cadre",
      status: "ACTIVE",
    },
    create: {
      id: ids.typeFrames,
      organizationId,
      code: "dev-frames",
      name: "Cadres montés",
      category: "Consommables",
      trackingMode: "QUANTITY",
      defaultUnit: "cadre",
      status: "ACTIVE",
    },
  });

  await prisma.equipmentType.upsert({
    where: {
      organizationId_name: {
        organizationId,
        name: "Enfumoir inox",
      },
    },
    update: {
      id: ids.typeSmoker,
      category: "Outils terrain",
      trackingMode: "INDIVIDUAL",
      status: "ACTIVE",
    },
    create: {
      id: ids.typeSmoker,
      organizationId,
      code: "dev-smoker",
      name: "Enfumoir inox",
      category: "Outils terrain",
      trackingMode: "INDIVIDUAL",
      status: "ACTIVE",
    },
  });

  await prisma.equipmentType.upsert({
    where: {
      organizationId_name: {
        organizationId,
        name: "Combinaison intégrale",
      },
    },
    update: {
      id: ids.typeSuit,
      category: "Protection",
      trackingMode: "INDIVIDUAL",
      status: "ACTIVE",
    },
    create: {
      id: ids.typeSuit,
      organizationId,
      code: "dev-suit",
      name: "Combinaison intégrale",
      category: "Protection",
      trackingMode: "INDIVIDUAL",
      status: "ACTIVE",
    },
  });

  await prisma.equipmentStock.upsert({
    where: { id: ids.stockFrames },
    update: {
      equipmentTypeId: ids.typeFrames,
      apiaryId: ids.apiaryHome,
      quantity: 42,
      unit: "cadre",
      locationLabel: "Local matériel",
      notes: "Stock fictif pour développement.",
    },
    create: {
      id: ids.stockFrames,
      organizationId,
      equipmentTypeId: ids.typeFrames,
      apiaryId: ids.apiaryHome,
      quantity: 42,
      unit: "cadre",
      locationLabel: "Local matériel",
      notes: "Stock fictif pour développement.",
    },
  });

  await prisma.equipmentItem.upsert({
    where: {
      organizationId_fieldIdentifier: {
        organizationId,
        fieldIdentifier: "DEV-ENF-001",
      },
    },
    update: {
      id: ids.itemSmoker,
      equipmentTypeId: ids.typeSmoker,
      apiaryId: ids.apiaryHome,
      status: "AVAILABLE",
      locationLabel: "Caisse de visite",
    },
    create: {
      id: ids.itemSmoker,
      organizationId,
      equipmentTypeId: ids.typeSmoker,
      apiaryId: ids.apiaryHome,
      fieldIdentifier: "DEV-ENF-001",
      status: "AVAILABLE",
      locationLabel: "Caisse de visite",
    },
  });

  await prisma.equipmentItem.upsert({
    where: {
      organizationId_fieldIdentifier: {
        organizationId,
        fieldIdentifier: "DEV-COM-001",
      },
    },
    update: {
      id: ids.itemSuit,
      equipmentTypeId: ids.typeSuit,
      apiaryId: null,
      status: "TO_CLEAN",
      locationLabel: "Vestiaire",
    },
    create: {
      id: ids.itemSuit,
      organizationId,
      equipmentTypeId: ids.typeSuit,
      fieldIdentifier: "DEV-COM-001",
      status: "TO_CLEAN",
      locationLabel: "Vestiaire",
    },
  });

  await prisma.equipmentEvent.upsert({
    where: { id: ids.eventFrames },
    update: {
      quantity: 42,
      unit: "cadre",
      targetLocation: "Local matériel",
      notes: "Initialisation fictive du stock.",
    },
    create: {
      id: ids.eventFrames,
      organizationId,
      equipmentTypeId: ids.typeFrames,
      apiaryId: ids.apiaryHome,
      eventType: "QUANTITY_ADJUSTED",
      quantity: 42,
      unit: "cadre",
      targetLocation: "Local matériel",
      notes: "Initialisation fictive du stock.",
    },
  });

  await prisma.equipmentEvent.upsert({
    where: { id: ids.eventSmoker },
    update: {
      apiaryId: ids.apiaryHome,
      targetLocation: "Caisse de visite",
      notes: "Item fictif prêt pour démonstration.",
    },
    create: {
      id: ids.eventSmoker,
      organizationId,
      equipmentTypeId: ids.typeSmoker,
      equipmentItemId: ids.itemSmoker,
      apiaryId: ids.apiaryHome,
      eventType: "ITEM_CREATED",
      targetLocation: "Caisse de visite",
      notes: "Item fictif prêt pour démonstration.",
    },
  });

  await prisma.equipmentEvent.upsert({
    where: { id: ids.eventSuit },
    update: {
      targetLocation: "Vestiaire",
      notes: "Statut fictif à nettoyer.",
    },
    create: {
      id: ids.eventSuit,
        organizationId,
      equipmentTypeId: ids.typeSuit,
      equipmentItemId: ids.itemSuit,
      eventType: "STATUS_CHANGED",
      targetLocation: "Vestiaire",
      notes: "Statut fictif à nettoyer.",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
