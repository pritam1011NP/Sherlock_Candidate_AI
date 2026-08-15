from sqlalchemy.orm import Session

from app.models.permission import Permission
from app.models.role_permission import RolePermission
from app.models.roles import UserRole


PERMISSIONS = [

    # User Management
    ("users:create", "Create users"),
    ("users:view", "View users"),
    ("users:update", "Update users"),
    ("users:delete", "Delete users"),

    # Uploads
    ("upload:view", "View uploads"),
    ("upload:delete", "Delete uploads"),

    # Reports
    ("reports:view", "View reports"),

    # Dashboard
    ("dashboard:view", "View dashboard"),

    # Interview
    ("interview:create", "Create interviews"),
    ("interview:view", "View interviews"),

    # Live Verification
    ("live:verify", "Perform live verification"),

    # Audit
    ("audit:view", "View audit logs"),
]


ROLE_PERMISSIONS = {

    UserRole.ADMIN.value: [

        "users:create",
        "users:view",
        "users:update",
        "users:delete",

        "upload:view",
        "upload:delete",

        "reports:view",

        "dashboard:view",

        "interview:create",
        "interview:view",

        "live:verify",

        "audit:view",
    ],

    UserRole.INTERVIEWER.value: [

        "upload:view",

        "reports:view",

        "dashboard:view",

        "interview:create",
        "interview:view",

        "live:verify",
    ],

    UserRole.VIEWER.value: [

        "dashboard:view",

        "reports:view",

        "interview:view",

        "upload:view",
    ],
}


def seed_permissions(db: Session):

    # -----------------------------
    # Insert permissions
    # -----------------------------

    for name, description in PERMISSIONS:

        exists = (
            db.query(Permission)
            .filter(Permission.name == name)
            .first()
        )

        if exists is None:

            db.add(
                Permission(
                    name=name,
                    description=description,
                )
            )

    db.commit()

    # -----------------------------
    # Insert role permissions
    # -----------------------------

    for role, permissions in ROLE_PERMISSIONS.items():

        for permission in permissions:

            exists = (
                db.query(RolePermission)
                .filter(
                    RolePermission.role == role,
                    RolePermission.permission == permission,
                )
                .first()
            )

            if exists is None:

                db.add(
                    RolePermission(
                        role=role,
                        permission=permission,
                    )
                )

    db.commit()