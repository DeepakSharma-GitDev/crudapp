CREATE PROCEDURE ManageUser
    @action NVARCHAR(10),
    @name NVARCHAR(100) = NULL,
    @email NVARCHAR(100) = NULL,
    @dob DATE = NULL,
    @phone NVARCHAR(15) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @action = 'create'
    BEGIN
        INSERT INTO users (name, email, dob, phone)
        VALUES (@name, @email, @dob, @phone);
    END
    ELSE IF @action = 'read'
    BEGIN
        SELECT * FROM users;
    END
    ELSE IF @action = 'update'
    BEGIN
        UPDATE users 
        SET name = @name, dob = @dob, phone = @phone 
        WHERE email = @email;
    END
    ELSE IF @action = 'delete'
    BEGIN
        DELETE FROM users WHERE email = @email;
    END
END;