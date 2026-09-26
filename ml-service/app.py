from fastapi import FastAPI, HTTPException

from model import get_recommendations


app = FastAPI(title="SmartCart Recommendation Engine")


@app.get("/")
def home():
    return {
        "message": "SmartCart ML Recommendation Engine is running"
    }


@app.get("/recommend/{product_id}")
def recommend(product_id: int):

    try:
        recommendations = get_recommendations(product_id)

        return {
            "product_id": product_id,
            "recommendations": recommendations
        }

    except IndexError:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )