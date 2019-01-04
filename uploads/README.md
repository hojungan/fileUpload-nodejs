# MY CPL GraphQL Server  

## Author: Hojung An  


# server.js  
Express server.  
Uses jsonwebtoken for user authentication.  

# schema.js  
| Schema      | Relationship                                                                                                                      | Query        | Query Options                                                        | Mutation                                 | Returns                                                                                                                                                                                                                                                                                                                                    |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------|----------------------------------------------------------------------|------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| User        | hasMany Goal <br> hasMany Activity <br> hasMany CplCycle <br> hasMany Proof <br> belongsTo Institution <br> belongsTo Coordinator | users        | id <br> newUser <br> status <br> eceNum <br> firstName <br> lastName | createUser <br> updateUser <br> userAuth | id <br> eceNum <br> dateJoined <br> dateModified <br> modifiedBy <br> firstname <br> lastName <br> email <br> username <br> password <br> status <br> institution(Institution) <br> coordinator(Coordinator) <br> statChange <br> profilePic <br> newUser <br> goals(Goal) <br> activities(Activity) <br> cycles(Cycle) <br> proofs(Proof) |
| Institution | hasMany Coordinator <br> hasMany User                                                                                             | institutions | id                                                                   | addInstitution                           | id <br> name <br> program <br> coordinator(Coordinator) <br> users(User)                                                                                                                                                                                                                                                                   |
| Coordinator | hasMany User <br> belongsTo Institution                                                                                           | coordinators | id                                                                   | addCoordinator                           | id <br> firstName <br> lastName <br> email <br> school(Institution) <br> users(User)                                                                                                                                                                                                                                                       |
| Goal        | hasmany Activity <br> belongsTo User <br> belongsTo CplCycle                                                                      | goals        | id <br> userId <br> title                                            | addGoal                                  | id <br> createdDate <br> createdBy <br> title <br> description <br> cycle(Cycle) <br> activities(Activity)                                                                                                                                                                                                                                 |
| Activity    | hasMany Proof <br> hasOne Reflection <br> belongsTo Goal <br> belongsTo User <br> belongsTo CplCycle                              | activities   | id <br> userId <br> title <br> goalId                                | addActivity                              | id <br> createdDate <br> createdBy <br> title <br> description <br> goal(Goal) <br> cycle(Cycle) <br> proofs(Proof) <br> reflection(Reflection)                                                                                                                                                                                            |
| Proof       | belongsTo Activity <br> belongsTo Goal <br> belongsTo CplCycle <br> belongsTo User                                                | proofs       | id                                                                   | addProof <br> updateProof                | id <br> postedDate <br> userId <br> postedBy <br> modifiedDate <br> proofType <br> fileURL <br> activity(Activity)                                                                                                                                                                                                                         |
| Reflection  | belongsTo Activity <br> belongsTo CplCycle                                                                                        |              |                                                                      | upsertReflection                         | id <br> postedDate <br> modifiedDate <br> reflection <br> author(User) <br> activity(Activity)                                                                                                                                                                                                                                             |
| Cycle       | hasMany Goal <br> hasMany Activity <br> belongsTo User                                                                            |              |                                                                      | addCycle                                 | id <br> startDate <br> endDate <br> cycleNumber <br> user(User)                                                                                                                                                                                                                                                                            |
| Admin       |                                                                                                                                   | admins       | id                                                                   |                                          | id <br> firstName <br> lastName <br> username <br> password <br> email                                                                                                                                                                                                                                                                     |

---
---

## Notes  
**Admin**  
Created by the developer. Option to be created by another Admin will be introduced in the future. Admin is used when User's status is changed.  

**Reflection**  
No option to query on its own. It can queried within the Activity.  

**Cycle**  
No option to query on its own. It can be queried within User, Goal, Activity, Proof, Reflection.  

---
---
## Getting Started  

Clone the repo or download the zip file.  
Once cloned/downloaded should be able to start the server with  
```
npm start
```
If it doesn't start the server try
```
npm install
npm start
```

Inside the db.js file the database used is sqlite, db.sqlite is the local database file, and is set to reset and re-create the tables on restart of the server.  
Comment out from Line 319 to Line 397 to prevent reset/re-create of database. All data saved/created using mutation are saved.  
The data in the tables are all fake. None of the passwords are encrypted; bcrypt will not work.  
Inside schema.js leave the bcrypt codes commented.

Open any browser and go to **localhost:4000/graphql**

## Queries  

**User**
<table>
<tr>
<td style="width: 40%">
Query All Users
<pre>
{
  users{
    eceNum
    dateJoined
    dateModified
    modifiedBy{
      id
      firstName
      lastName
      email
    }
    firstName
    lastName
    email
    username
    password
    status
    institution{
      name
      program
    }
    coordinator{
      firstName
      lastName
      email
    }
    statChange
    profilePic
    newUser
    goals{
      createdDate
      title
      description
    }
    activities{
      createdDate
      title
      description
    }
    cycles{
      startDate
      endDate
      cycleNumber
    }
    proofs{
      postedDate
      modifiedDate
      proofType
      fileURL
    }
  }
}
</pre>
</td>
<td style="width: 60%">
Query using args
<pre>
{
  users([id: int, newUser: boolean, status: int, eceNum: string, firstName: string, lastName: string]){
    eceNum
    dateJoined
    dateModified
    modifiedBy{
      id
      firstName
      lastName
      email
    }
    firstName
    lastName
    email
    username
    password
    status
    institution{
      name
      program
    }
    coordinator{
      firstName
      lastName
      email
    }
    statChange
    profilePic
    newUser
    goals{
      createdDate
      title
      description
    }
    activities{
      createdDate
      title
      description
    }
    cycles{
      startDate
      endDate
      cycleNumber
    }
    proofs{
      postedDate
      modifiedDate
      proofType
      fileURL
    }
  }
}
</pre>
</td>
</tr>
</table>

---

**Goals**  
<table>
<tr>
<td style="width: 40%">
Query All Goals
<pre>
{
  goals{
    createdDate
    createdBy{
      firstName
      lastName
    }
    title
    description
    cycle{
      startDate
      endDate
      cycleNumber
    }
    activities{
      title
      description
    }
  }
}
</pre>
</td>
<td style="width: 60%">
Query using args
<pre>
{
  goals([id: int, userId: int, title: string]){
    createdDate
    createdBy{
      firstName
      lastName
    }
    title
    description
    cycle{
      startDate
      endDate
      cycleNumber
    }
    activities{
      title
      description
    }
  }
}
</pre>
</td>
</tr>
</table>

---

**Activity**
<table>
<tr>
<td style="width: 40%">
Query all Activities
<pre>
{
  activities{
    createdDate
    createdBy{
      firstName
      lastName
    }
    title
    description
    goal{
      title
      description
    }
    cycle{
      startDate
      endDate
      cycleNumber
    }
    proofs{
      postedDate
      proofType
      fileURL
    }
    reflection{
      postedDate
      reflection
    }
  }
}
</pre>
</td>
<td style="width: 100%">
Query using args
<pre>
{
  activities([id: int, userId: int, title: string, goalId: int]){
    createdDate
    createdBy{
      firstName
      lastName
    }
    title
    description
    goal{
      title
      description
    }
    cycle{
      startDate
      endDate
      cycleNumber
    }
    proofs{
      postedDate
      proofType
      fileURL
    }
    reflection{
      postedDate
      reflection
    }
  }
}
</pre>
</td>
</tr>
</table>

---

**Institution**
<table>
<tr>
<td style="width: 50%">
Query all Institutions
<pre>
{
  institutions{
    name
    program
    coordinator{
      firstName
      lastName
    }
  }
}
</pre>
</td>
<td style="width: 50%">
Query using args
<pre>
{
  institutions(id: int){
    name
    program
    coordinator{
      firstName
      lastName
    }
  }
}
</pre>
</td>
</tr>
</table>

---
**Coordinator**
<table>
<td>
Query all Coordinators
<pre>
{
  coordinators{
    firstName
    lastName
    email
    school{
      name
      program
    }
    users{
      firstName
      lastName
    }
  }
}
</pre>
</td>
<td>
Query using args
<pre>
{
  coordinators(id: int){
    firstName
    lastName
    email
    school{
      name
      program
    }
    users{
      firstName
      lastName
    }
  }
}
</pre>
</td>
</table>

---
**Proof**
<table>
<td>
Query all Proofs
<pre>
{
  proofs{
    postedDate
    postedBy{
      firstName
      lastName
    }
    modifiedDate
    proofType
    fileURL
    activity{
      title
    }
  }
}
</pre>
</td>
<td>
Query using args
<pre>
{
  proofs(id: int){
    postedDate
    postedBy{
      firstName
      lastName
    }
    modifiedDate
    proofType
    fileURL
    activity{
      title
    }
  }
}
</pre>
</td>
</table>

---
**Admin**
<table>
<td>
Query all Admins
<pre>
{
  admins{
    firstName
    lastName
    username
    password
    email
  }
}
</pre>
</td>
<td>
Query using args
<pre>
{
  admins(id: int){
    firstName
    lastName
    username
    password
    email
  }
}
</pre>
</td>
</table>

---
---

## Mutations

**createUser**
```
mutation {
    createUser(eceNum: String, firstName: String, lastName: String, email: String, username: String, passwd: String, status: Int, statChange: Boolean, profilePic: String, institutionId: Int, coordinatorId: Int)
}
createUser resturns stringified JSON message
```

**updateUser**
```
mutation{
    updateUser(eceNum: String, firstName: String, lastName: String, email: String, username: String, passwd: String, status: Int, statChange: Boolean, profilePic: String, institutionId: Int, coordinatorId: Int){
        // specify fields to return
    }
}
```

**userAuth**
```
mutation {
    userAuth(username: string, passwd: string)
}
userAuth returns JSON Web Token
```

**addInstitution**
```
mutation {
    addInstitution(name: string, program: string) {
        // specify fields to return
    }
}
```

**addActivity**
```
mutation {
    addActivity(title: string, description: string, goalId: int, userId: int, cycleId: int) {
        // specify fields to return
    }
}
```

**addGoal**
```
mutation {
    addGoal(title: string, description: string, userId: int, cycleId: int) {
        // specify fields to return
    }
}
```

**AddProof**
```
mutation {
    addProof(proofType: int, fileLocation: string) {
        // specify fields to return
    }
}
```

**updateProof**
```
mutation {
    updateProof(id: int, proofType: int, fileLocation: string) {
        // specify fields to return
    }
}
```

**addCycle**
```
mutation {
    addCycle(startDate: string, endDate: string, userId: int) {
        // specify fields to return
    }
}
```

**upsertReflection**
```
mutation {
    upsertReflection(reflection: string, activityId: int, cycleId: int, userId: int) {
        // specify fields to return
    }
}
upsertReflection inserts new Reflection if not exist; if exist update existing Reflection  
```

**addCoordinator**
```
mutation {
    addCoordinator(firstName: string, lastName: string, email: string, institutionId: int) {
        // specify fields to return
    }
}
```