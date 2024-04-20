ALTER TABLE
   users.users
ADD
   COLUMN full_name VARCHAR(255),
ADD
   COLUMN phone VARCHAR(20),
ADD
   COLUMN birthday DATE,
ADD
   COLUMN language VARCHAR(50),
ADD
   COLUMN twitter VARCHAR(255),
ADD
   COLUMN instagram VARCHAR(255),
ADD
   COLUMN website VARCHAR(255),
ADD
   COLUMN dark_mode BOOLEAN DEFAULT false,
ADD
   COLUMN text_notifications BOOLEAN DEFAULT false,
ADD
   COLUMN email_notifications BOOLEAN DEFAULT false;