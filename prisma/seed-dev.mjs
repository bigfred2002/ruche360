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
  hiveStored: "dev-hive-stored-001",
  hiveMaintenance: "dev-hive-maintenance-001",
  colonyOne: "dev-colony-001",
  colonyTwo: "dev-colony-002",
  visitOpen: "dev-visit-open-001",
  visitObservationColony: "dev-visit-observation-colony-001",
  visitObservationFollowUp: "dev-visit-observation-follow-up-001",
  visitPlanned: "dev-visit-planned-001",
  healthObservationOpen: "dev-health-observation-open-001",
  varroaRecordOpen: "dev-varroa-record-open-001",
  hornetRecordHill: "dev-hornet-record-hill-001",
  taskUrgent: "dev-task-urgent-001",
  taskVisitFollowUp: "dev-task-follow-up-001",
  taskEquipment: "dev-task-equipment-001",
  typeFrames: "dev-equipment-type-frames",
  typeSmoker: "dev-equipment-type-smoker",
  typeSuit: "dev-equipment-type-suit",
  typeExtractor: "dev-equipment-type-extractor",
  stockFrames: "dev-equipment-stock-frames",
  itemSmoker: "dev-equipment-item-smoker",
  itemSuit: "dev-equipment-item-suit",
  itemExtractor: "dev-equipment-item-extractor",
  eventFrames: "dev-equipment-event-frames",
  eventSmoker: "dev-equipment-event-smoker",
  eventSuit: "dev-equipment-event-suit",
  eventExtractor: "dev-equipment-event-extractor",
  movementCoteaux: "dev-hive-movement-coteaux-001",
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
  ["transhumance", "Transhumance", "BEEKEEPING"],
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
  ["transhumance.read", "Lire la transhumance"],
  ["transhumance.write", "Modifier la transhumance"],
  ["transhumance.manage", "Administrer la transhumance"],
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
  await seedFieldScenarios(organization.id, membership.id);
  await seedHealthScenarios(organization.id, membership.id);

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
        fieldIdentifier: "DEV-STOCK-001",
      },
    },
    update: {
      id: ids.hiveStored,
      apiaryId: null,
      hiveType: "Dadant 10 cadres",
      status: "STORED",
      notes: "Ruche fictive au stock, sans colonie active.",
    },
    create: {
      id: ids.hiveStored,
      organizationId,
      fieldIdentifier: "DEV-STOCK-001",
      hiveType: "Dadant 10 cadres",
      status: "STORED",
      notes: "Ruche fictive au stock, sans colonie active.",
    },
  });

  await prisma.hive.upsert({
    where: {
      organizationId_fieldIdentifier: {
        organizationId,
        fieldIdentifier: "DEV-REPAIR-001",
      },
    },
    update: {
      id: ids.hiveMaintenance,
      apiaryId: null,
      hiveType: "Ruchette",
      status: "MAINTENANCE",
      notes: "Ruche fictive en réparation, sans colonie active.",
    },
    create: {
      id: ids.hiveMaintenance,
      organizationId,
      fieldIdentifier: "DEV-REPAIR-001",
      hiveType: "Ruchette",
      status: "MAINTENANCE",
      notes: "Ruche fictive en réparation, sans colonie active.",
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
        name: "Extracteur manuel",
      },
    },
    update: {
      id: ids.typeExtractor,
      category: "Récolte",
      trackingMode: "INDIVIDUAL",
      status: "ACTIVE",
      notes: "Matériel fictif de récolte pour tester la maintenance.",
    },
    create: {
      id: ids.typeExtractor,
      organizationId,
      code: "dev-extractor",
      name: "Extracteur manuel",
      category: "Récolte",
      trackingMode: "INDIVIDUAL",
      status: "ACTIVE",
      notes: "Matériel fictif de récolte pour tester la maintenance.",
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
        fieldIdentifier: "DEV-EXT-001",
      },
    },
    update: {
      id: ids.itemExtractor,
      equipmentTypeId: ids.typeExtractor,
      apiaryId: null,
      status: "MAINTENANCE",
      locationLabel: "Atelier fictif",
      notes: "Roulement à contrôler dans le scénario de développement.",
    },
    create: {
      id: ids.itemExtractor,
      organizationId,
      equipmentTypeId: ids.typeExtractor,
      fieldIdentifier: "DEV-EXT-001",
      status: "MAINTENANCE",
      locationLabel: "Atelier fictif",
      notes: "Roulement à contrôler dans le scénario de développement.",
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

  await prisma.equipmentEvent.upsert({
    where: { id: ids.eventExtractor },
    update: {
      targetLocation: "Atelier fictif",
      notes: "Maintenance fictive pour démonstration.",
    },
    create: {
      id: ids.eventExtractor,
      organizationId,
      equipmentTypeId: ids.typeExtractor,
      equipmentItemId: ids.itemExtractor,
      eventType: "MAINTENANCE",
      targetLocation: "Atelier fictif",
      notes: "Maintenance fictive pour démonstration.",
    },
  });
}

async function seedFieldScenarios(organizationId, membershipId) {
  await prisma.visit.upsert({
    where: { id: ids.visitOpen },
    update: {
      apiaryId: ids.apiaryHome,
      hiveId: ids.hiveOne,
      colonyId: ids.colonyOne,
      authorMembershipId: membershipId,
      status: "IN_PROGRESS",
      visitedAt: new Date("2026-05-14T08:30:00.000Z"),
      objective: "Visite fictive de reprise de printemps",
      weatherSummary: "Temps doux, vent faible, météo saisie manuellement.",
      colonyStrength: 4,
      notes: "Scénario local: contrôle rapide sans diagnostic automatique.",
      followUpSummary: "Prévoir un passage court pour vérifier les réserves.",
    },
    create: {
      id: ids.visitOpen,
      organizationId,
      apiaryId: ids.apiaryHome,
      hiveId: ids.hiveOne,
      colonyId: ids.colonyOne,
      authorMembershipId: membershipId,
      status: "IN_PROGRESS",
      visitedAt: new Date("2026-05-14T08:30:00.000Z"),
      objective: "Visite fictive de reprise de printemps",
      weatherSummary: "Temps doux, vent faible, météo saisie manuellement.",
      colonyStrength: 4,
      notes: "Scénario local: contrôle rapide sans diagnostic automatique.",
      followUpSummary: "Prévoir un passage court pour vérifier les réserves.",
    },
  });

  await prisma.visit.upsert({
    where: { id: ids.visitPlanned },
    update: {
      apiaryId: ids.apiaryHill,
      hiveId: ids.hiveTwo,
      colonyId: ids.colonyTwo,
      authorMembershipId: membershipId,
      status: "PLANNED",
      visitedAt: new Date("2026-05-18T09:00:00.000Z"),
      objective: "Visite fictive de contrôle d'une colonie faible",
      weatherSummary: "À confirmer sur le terrain, sans météo connectée.",
      colonyStrength: 2,
      notes: "Scénario local: visite prévue pour tester les statuts.",
      followUpSummary: "Comparer la force estimée avec la visite précédente.",
    },
    create: {
      id: ids.visitPlanned,
      organizationId,
      apiaryId: ids.apiaryHill,
      hiveId: ids.hiveTwo,
      colonyId: ids.colonyTwo,
      authorMembershipId: membershipId,
      status: "PLANNED",
      visitedAt: new Date("2026-05-18T09:00:00.000Z"),
      objective: "Visite fictive de contrôle d'une colonie faible",
      weatherSummary: "À confirmer sur le terrain, sans météo connectée.",
      colonyStrength: 2,
      notes: "Scénario local: visite prévue pour tester les statuts.",
      followUpSummary: "Comparer la force estimée avec la visite précédente.",
    },
  });

  await prisma.visitObservation.upsert({
    where: { id: ids.visitObservationColony },
    update: {
      visitId: ids.visitOpen,
      category: "COLONY",
      label: "Activité régulière",
      value: "Entrées et sorties visibles",
      notes: "Observation fictive courte pour le parcours terrain.",
    },
    create: {
      id: ids.visitObservationColony,
      organizationId,
      visitId: ids.visitOpen,
      category: "COLONY",
      label: "Activité régulière",
      value: "Entrées et sorties visibles",
      notes: "Observation fictive courte pour le parcours terrain.",
    },
  });

  await prisma.visitObservation.upsert({
    where: { id: ids.visitObservationFollowUp },
    update: {
      visitId: ids.visitOpen,
      category: "FOLLOW_UP",
      label: "Suite volontaire",
      value: "Contrôle des réserves",
      notes: "Aucune tâche automatique n'est créée par cette observation.",
    },
    create: {
      id: ids.visitObservationFollowUp,
      organizationId,
      visitId: ids.visitOpen,
      category: "FOLLOW_UP",
      label: "Suite volontaire",
      value: "Contrôle des réserves",
      notes: "Aucune tâche automatique n'est créée par cette observation.",
    },
  });

  await prisma.task.upsert({
    where: { id: ids.taskUrgent },
    update: {
      apiaryId: ids.apiaryHill,
      hiveId: ids.hiveTwo,
      colonyId: ids.colonyTwo,
      createdByMembershipId: membershipId,
      assignedToMembershipId: membershipId,
      title: "Vérifier la colonie faible",
      description: "Tâche fictive urgente pour tester les priorités terrain.",
      status: "TODO",
      priority: "URGENT",
      dueAt: new Date("2026-05-19T12:00:00.000Z"),
    },
    create: {
      id: ids.taskUrgent,
      organizationId,
      apiaryId: ids.apiaryHill,
      hiveId: ids.hiveTwo,
      colonyId: ids.colonyTwo,
      createdByMembershipId: membershipId,
      assignedToMembershipId: membershipId,
      title: "Vérifier la colonie faible",
      description: "Tâche fictive urgente pour tester les priorités terrain.",
      status: "TODO",
      priority: "URGENT",
      dueAt: new Date("2026-05-19T12:00:00.000Z"),
    },
  });

  await prisma.task.upsert({
    where: { id: ids.taskVisitFollowUp },
    update: {
      apiaryId: ids.apiaryHome,
      hiveId: ids.hiveOne,
      colonyId: ids.colonyOne,
      visitId: ids.visitOpen,
      createdByMembershipId: membershipId,
      assignedToMembershipId: membershipId,
      title: "Contrôler les réserves",
      description: "Suite fictive créée volontairement depuis une visite.",
      status: "IN_PROGRESS",
      priority: "NORMAL",
      dueAt: new Date("2026-05-21T12:00:00.000Z"),
    },
    create: {
      id: ids.taskVisitFollowUp,
      organizationId,
      apiaryId: ids.apiaryHome,
      hiveId: ids.hiveOne,
      colonyId: ids.colonyOne,
      visitId: ids.visitOpen,
      createdByMembershipId: membershipId,
      assignedToMembershipId: membershipId,
      title: "Contrôler les réserves",
      description: "Suite fictive créée volontairement depuis une visite.",
      status: "IN_PROGRESS",
      priority: "NORMAL",
      dueAt: new Date("2026-05-21T12:00:00.000Z"),
    },
  });

  await prisma.task.upsert({
    where: { id: ids.taskEquipment },
    update: {
      createdByMembershipId: membershipId,
      assignedToMembershipId: membershipId,
      title: "Nettoyer la combinaison de visite",
      description: "Tâche fictive liée au matériel, sans achat ni fournisseur.",
      status: "TODO",
      priority: "LOW",
      dueAt: new Date("2026-05-22T12:00:00.000Z"),
    },
    create: {
      id: ids.taskEquipment,
      organizationId,
      createdByMembershipId: membershipId,
      assignedToMembershipId: membershipId,
      title: "Nettoyer la combinaison de visite",
      description: "Tâche fictive liée au matériel, sans achat ni fournisseur.",
      status: "TODO",
      priority: "LOW",
      dueAt: new Date("2026-05-22T12:00:00.000Z"),
    },
  });

  await prisma.hiveMovement.upsert({
    where: { id: ids.movementCoteaux },
    update: {
      sourceApiaryId: ids.apiaryHome,
      destinationApiaryId: ids.apiaryHill,
      authorMembershipId: membershipId,
      departureDate: new Date("2026-05-20T06:00:00.000Z"),
      arrivalDate: null,
      status: "IN_PROGRESS",
      reason: "HONEY_FLOW",
      notes: "Mouvement fictif manuel, sans GPS actif.",
    },
    create: {
      id: ids.movementCoteaux,
      organizationId,
      sourceApiaryId: ids.apiaryHome,
      destinationApiaryId: ids.apiaryHill,
      authorMembershipId: membershipId,
      departureDate: new Date("2026-05-20T06:00:00.000Z"),
      status: "IN_PROGRESS",
      reason: "HONEY_FLOW",
      notes: "Mouvement fictif manuel, sans GPS actif.",
    },
  });

  await prisma.hiveMovementItem.upsert({
    where: {
      movementId_hiveId: {
        movementId: ids.movementCoteaux,
        hiveId: ids.hiveOne,
      },
    },
    update: {
      notes: "Ruche fictive ajoutée au mouvement de démonstration.",
    },
    create: {
      movementId: ids.movementCoteaux,
      hiveId: ids.hiveOne,
      notes: "Ruche fictive ajoutée au mouvement de démonstration.",
    },
  });
}

async function seedHealthScenarios(organizationId, membershipId) {
  await prisma.healthObservation.upsert({
    where: { id: ids.healthObservationOpen },
    update: {
      apiaryId: ids.apiaryHome,
      hiveId: ids.hiveOne,
      colonyId: ids.colonyOne,
      visitId: ids.visitOpen,
      authorMembershipId: membershipId,
      category: "DISEASE_SIGN",
      severity: "WATCH",
      observedAt: new Date("2026-05-14T08:45:00.000Z"),
      label: "A surveiller sans diagnostic",
      notes: "Observation fictive de developpement, sans prescription automatique.",
    },
    create: {
      id: ids.healthObservationOpen,
      organizationId,
      apiaryId: ids.apiaryHome,
      hiveId: ids.hiveOne,
      colonyId: ids.colonyOne,
      visitId: ids.visitOpen,
      authorMembershipId: membershipId,
      category: "DISEASE_SIGN",
      severity: "WATCH",
      observedAt: new Date("2026-05-14T08:45:00.000Z"),
      label: "A surveiller sans diagnostic",
      notes: "Observation fictive de developpement, sans prescription automatique.",
    },
  });

  await prisma.varroaRecord.upsert({
    where: { id: ids.varroaRecordOpen },
    update: {
      apiaryId: ids.apiaryHome,
      hiveId: ids.hiveOne,
      colonyId: ids.colonyOne,
      visitId: ids.visitOpen,
      authorMembershipId: membershipId,
      method: "STICKY_BOARD",
      observedAt: new Date("2026-05-14T08:50:00.000Z"),
      miteCount: 3,
      sampleSize: null,
      infestationRate: null,
      notes: "Releve varroa fictif manuel, sans seuil ni action automatique.",
    },
    create: {
      id: ids.varroaRecordOpen,
      organizationId,
      apiaryId: ids.apiaryHome,
      hiveId: ids.hiveOne,
      colonyId: ids.colonyOne,
      visitId: ids.visitOpen,
      authorMembershipId: membershipId,
      method: "STICKY_BOARD",
      observedAt: new Date("2026-05-14T08:50:00.000Z"),
      miteCount: 3,
      notes: "Releve varroa fictif manuel, sans seuil ni action automatique.",
    },
  });

  await prisma.hornetRecord.upsert({
    where: { id: ids.hornetRecordHill },
    update: {
      apiaryId: ids.apiaryHill,
      visitId: ids.visitPlanned,
      authorMembershipId: membershipId,
      pressure: "LOW",
      observedAt: new Date("2026-05-18T09:15:00.000Z"),
      hornetCount: 2,
      trapCount: 1,
      notes: "Signalement frelon fictif de pression faible, sans alerte automatique.",
    },
    create: {
      id: ids.hornetRecordHill,
      organizationId,
      apiaryId: ids.apiaryHill,
      visitId: ids.visitPlanned,
      authorMembershipId: membershipId,
      pressure: "LOW",
      observedAt: new Date("2026-05-18T09:15:00.000Z"),
      hornetCount: 2,
      trapCount: 1,
      notes: "Signalement frelon fictif de pression faible, sans alerte automatique.",
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
