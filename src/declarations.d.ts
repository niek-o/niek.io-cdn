declare module "light-audio-converter" {
  function convertAndSaveAudio(
    audioFileData: File | string,
    targetFormat: string,
    outputFilePath: string
  );

  export { convertAndSaveAudio };
}
