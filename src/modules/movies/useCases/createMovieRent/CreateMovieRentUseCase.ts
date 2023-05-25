import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateMovieRentDTO } from "../../dtos/CreateMovieRentDTO";

export class CreateMovieRentUseCase{
    async execute({movieId, userId}: CreateMovieRentDTO): Promise<void> {
        //verificar se filme existe
        const movieExists = await prisma.movie.findUnique({
            where: {
                id:movieId
            }
        });

        if (!movieExists){
            throw new AppError("Movie does not exists!")
        }

        //verificar se filme esta alugado por outra pessoa
        const movieAlreadyRented = await prisma.movieRent.findFirst({
            where: {
                movieId
            }
        })

        if(movieAlreadyRented) {
            throw new AppError("movie already rented");
        }

        //verificar se usuario existe
        const userExists = await prisma.user.findUnique({
            where: {
                id:userId
            }
        });

        if (!userExists){
            throw new AppError("User does not exists!")
        }
        //criar locação
        await prisma.movieRent.create({
            data: {
                movieId,
                userId,
            }
        })
    }
}