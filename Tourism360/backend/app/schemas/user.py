from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):

    name: str

    email: EmailStr

    password: str

    user_type: str = "tourist"