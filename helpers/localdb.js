import React, { Component } from 'react'
import { Alert, Platform } from 'react-native'

import * as SQLite from 'expo-sqlite';
import store from 'react-native-simple-store';







//SQLite.enablePromise(true);

export const errorCB = (err) => {
  console.log("SQL Error: " + err);
}
 
export const successCB = () => {
  console.log("SQL executed fine");
}
 
export const openCB = () => {
  console.log("Database OPENED");
}
export const openDatabase = () => {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("Users.db");
  return db;
}


const db = openDatabase()
//export const db;

export const createTable = async () => {

  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists users (id integer primary key not null, email text, password text);"
    );
  });

  // create table if not exists
  
  };

  export const saveAuth = async (email, password) => {
    
    if (Platform.OS === "web") {
        await store.save('user', {email: email, password: password, loggedIn: true})
        return true;
      }
    

      //save email and password to local database
      db.transaction((tx) => {
        tx.executeSql("insert into users (email, password) values (?, ?)", [email, password]);
        tx.executeSql("select * from users", [], (_, { rows }) => {
        console.log(JSON.stringify(rows))
        if(rows.length > 0){
          store.save('user', {email: email, password: password, loggedIn: true})
          return true;
        }else{
          return false;
        }
      }
        );
    }
      );
    
  };
  
  export const deleteAuth = async (id) => {
    const deleteQuery = `DELETE from ${tableName} WHERE 1`;
    await db.executeSql(deleteQuery);
    
    if (Platform.OS === "web") {
      await store.delete('user')
    }
  };

export const getAuth = (email, password) => {
    if (Platform.OS === "web") {
        user = store.get('user');
        //check if email and password match user.email and user.password
        if(user.email == email && user.password == password){
          return true;
        
        }else{
            return false;
        }
    }
    db.transaction((tx) => {
     
      tx.executeSql("select * from users WHERE email=? AND password=?", [email,password], (_, { rows }) => {
      console.log(JSON.stringify(rows))
      if(rows.length > 0){
        return Promise.resolve(rows);
      }else{
        return Promise.resolve(rows);
      }
    }
      );
  }
    );
  
    

}


export const getAuthSplash = () => {
  if (Platform.OS === "web") {
      user = store.get('user');
      //check if email and password match user.email and user.password
      if(user.email != undefined){
        return true;
      
      }else{
          return false;
      }
  }
  db.transaction(
  (tx) => {
    
    //get user where email and password match
      tx.executeSql("select * from users where 1", [], (_, { rows }) =>
      {
          //return true if they match
          if(rows.length > 0){
            return Promise.resolve(rows);
            
          }else{
             // console.log(rows)
              return Promise.resolve(rows);
          }
          //console.log(JSON.stringify(rows))
      }
      );   
  },
  errorCB
);
  

}





