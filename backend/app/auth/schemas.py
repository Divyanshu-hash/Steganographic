from pydantic import BaseModel, EmailStr, Field, validator

class Register(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)

    @validator("password")
    def strong_password(cls, v):
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain at least one digit")
        if not any(c.isalpha() for c in v):
            raise ValueError("Password must contain letters")
        return v

class Login(BaseModel):
    email: EmailStr
    password: str
