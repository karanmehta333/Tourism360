from pydantic import BaseModel

class DestinationCreate(BaseModel):
    name: str
    city: str
    description: str = ""
    image_url: str = ""
    category: str = ""

class DestinationResponse(BaseModel):
    id: int
    name: str
    city: str
    description: str
    image_url: str
    category: str

    class Config:
        from_attributes = True