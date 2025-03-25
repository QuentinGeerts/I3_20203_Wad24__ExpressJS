USE master;

-- Vérifier si la base de données existe avant d'exécuter ALTER TABLE pour couper les connexions
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'ToDoList')
BEGIN
  -- Fermer toutes les connexions actives
  ALTER DATABASE ToDoList SET SINGLE_USER WITH ROLLBACK IMMEDIATE;

  -- Supprimer la database
  DROP DATABASE ToDoList;
END
GO

-- Créer la base de données
CREATE DATABASE ToDoList;
GO

USE ToDoList;
GO

-- DDL: Création des tables

CREATE TABLE
  [User] (
    [Id] UNIQUEIDENTIFIER,
    [Email] NVARCHAR(320) NOT NULL,
    [Password] VARBINARY(MAX) NOT NULL,
    CONSTRAINT PK_User PRIMARY KEY ([Id]),
    CONSTRAINT UK_Email UNIQUE ([Email])
  );

CREATE TABLE
  [Task] (
    [Id] UNIQUEIDENTIFIER,
    [Title] NVARCHAR(MAX) NOT NULL,
    [IsDone] BIT NOT NULL,
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT PK_Task PRIMARY KEY (Id),
    CONSTRAINT FK_Task_User FOREIGN KEY (UserId) REFERENCES [User] ([Id])
  );
