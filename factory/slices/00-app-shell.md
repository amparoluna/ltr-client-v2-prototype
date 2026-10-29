# App shell

## Does

The sidebar shows Dashboard, Open items, People & animals, and Settings. Settings opens General, Integrations, Policy management, Property groups, Properties, Users, and Billing & payment, and returns to the main menu.

The app opens signed in as Dwight Schrute. The sidebar shows his initials, name, and "Org Admin". The user menu includes Account and Impersonate user. Impersonate user lists the three seeded users, each with their role followed by the properties assigned to them. Choosing another user asks "Continue as {name}?" and Continue switches to that user. The sidebar then shows that user's initials, name, role, and properties. A banner says "Viewing as {name}" and "Signed in as Dwight Schrute", with Exit impersonation. Exit impersonation selects Dwight Schrute again. The selected user stays after a reload.

Dashboard, Open items, and Account are empty pages titled with those names. Account opens from the user menu. People & animals and each settings screen are empty pages titled with those names.

The footer shows Resources, Privacy Policy, Terms of Service, Email us at clientsupport@petscreening.com, and © PetScreening, Inc. All Rights Reserved.

## Saves

The seed script writes three users into the SQLite database. `role` is Org Admin or Property Manager. `properties` is a separate column listing the properties that user is assigned directly. The Org Admin has none.

| id | name | initials | role | properties |
| --- | --- | --- | --- | --- |
| dwight | Dwight Schrute | DS | Org Admin | |
| pam | Pam Beesly | PB | Property Manager | Clear Creek Meadows, Metro Lofts — Austin |
| kevin | Kevin Malone | KM | Property Manager | Renaissance Terrace |

The selected user id is stored in the browser and sent as `X-User-Id`. With nothing stored, the selected user is Dwight Schrute. Nothing else is written.

## Who

Dwight Schrute, Pam Beesly, and Kevin Malone may switch users and open every page in **Does**.

`GET /api/users` with `X-User-Id: samantha` returns 401 and no user list. Each of the three seeded users is refused that same unknown id.

## Seams

`GET /api/users`

- Request: header `X-User-Id: dwight`.
- Response: 200 and the three seeded users, `dwight`, then `pam`, then `kevin`. Each has `id`, `name`, `initials`, `role`, and `properties`. `properties` is an array of names. Dwight's array is empty. Pam's array is `Clear Creek Meadows`, then `Metro Lofts — Austin`. Kevin's array is `Renaissance Terrace`.
- The same request with `X-User-Id: pam` or `X-User-Id: kevin` returns that same 200 body.
- Refusal: `X-User-Id: samantha`, or a missing `X-User-Id`, returns 401 and no user list.

## Check

1. Open the app. The sidebar shows Dwight Schrute, DS, and Org Admin. There is no viewing banner.
2. Open Dashboard, Open items, Account, People & animals, and each settings entry. Each page is empty and titled with its name.
3. Reload. Dwight Schrute is still selected.
4. Impersonate Pam Beesly and continue. The sidebar shows Pam Beesly, PB, and Property Manager · Clear Creek Meadows, Metro Lofts — Austin. The banner says Viewing as Pam Beesly and Signed in as Dwight Schrute. Reload. Pam Beesly is still selected.
5. Impersonate Kevin Malone and continue. The sidebar shows Kevin Malone, KM, and Property Manager · Renaissance Terrace. Exit impersonation. The sidebar shows Dwight Schrute and Org Admin again, and the banner is gone.
6. Restart the API. `GET /api/users` as Dwight still returns the three seeded users.
