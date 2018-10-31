FROM zodern/meteor
COPY ./DockerImage/myfilenpmrc /home/.npmrc
COPY --chown=app:app ./DockerImage/file.tar.gz /bundle/bundle.tar.gz